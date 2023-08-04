"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verification_1 = require("@config/verification");
const user_service_1 = __importDefault(require("@service/user.service"));
const verification_service_1 = __importDefault(require("@service/verification.service"));
const generateCode_1 = require("@utils/generateCode");
const jwt_service_1 = require("@service/jwt.service");
// import bcrypt from 'bcrypt'
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = req.body;
        const verified = yield verification_service_1.default.findVerificationById(verify.verificationId);
        if (verified == null) {
            return res.status(400).json({
                message: `verification id: ${verify.verificationId} not found`
            });
        }
        const timeOut = (0, generateCode_1.getTimeOut)(verified.createdAt, verification_1.VERIFICATION_TIMEOUT);
        if (timeOut < 0) {
            return res.status(400).json({
                message: 'Verification code is expired, please resend code'
            });
        }
        if (verified.code != verify.code) {
            return res.status(400).json({
                message: 'Wrong verification code'
            });
        }
        const user = yield user_service_1.default.findUserByEmail(verified.email);
        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const payload = {
            userId: user.id,
            // email: user.email,
            // address: user.address
        };
        console.log(payload);
        const token = yield (0, jwt_service_1.sign)(payload);
        const updateUser = yield user_service_1.default.changeUserRole(user.id, 'user');
        return res.status(201).json({
            message: 'Succesfully registered',
            user: {
                id: user.id,
                name: updateUser.name,
                surname: updateUser.surname,
                phone: updateUser.phone,
                email: updateUser.email,
                address: updateUser.address,
                role: updateUser.role
            },
            token: token
        });
        // second variant
        // return res.status(201).json({
        //     message: 'Succesfully registered',
        //     user: {
        //         id: payload.userId,
        //         name: updateUser.name,
        //         surname: updateUser.surname,
        //         phone: updateUser.phone,
        //         email: payload.email,
        //         address: payload.address,
        //         role: updateUser.role
        //     },
        //     token: token
        // })
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=verify.js.map