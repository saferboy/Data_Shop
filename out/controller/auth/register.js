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
const generateCode_1 = require("@utils/generateCode");
const verification_1 = require("@config/verification");
const verification_service_1 = __importDefault(require("@service/verification.service"));
const user_service_1 = __importDefault(require("@service/user.service"));
const mail_service_1 = require("@service/mail.service");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const isExcist = yield user_service_1.default.excistUser(data.email);
        if (isExcist) {
            return res.status(403).json({
                message: 'Email alredy busy'
            });
        }
        const newUser = yield user_service_1.default.createUser(data);
        const code = (0, generateCode_1.generateCode)();
        yield (0, mail_service_1.sendEmail)(newUser.email, code);
        const verification = yield verification_service_1.default.createVerification(code, newUser.email);
        if (verification == null) {
            return res.status(500).json({
                message: "Can't save verification"
            });
        }
        const deleteCount = yield verification_service_1.default.cleanVerification(verification_1.VERIFICATION_TIMEOUT);
        console.log('Deleted verification', deleteCount);
        return res.status(200).json({
            message: 'Verification code sended to email',
            email: newUser.email,
            verificationId: verification.id,
            timeOut: (0, generateCode_1.getTimeOut)(verification.createdAt, verification_1.VERIFICATION_TIMEOUT)
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=register.js.map