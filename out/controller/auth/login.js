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
const user_service_1 = __importDefault(require("@service/user.service"));
const jwt_service_1 = require("@service/jwt.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = req.body;
        const user = yield user_service_1.default.findUserByEmail(login.email);
        if (!user) {
            return res.status(404).json({
                message: `User with email ${login.email} not found`
            });
        }
        if (user.role == 'none') {
            return res.status(400).json({
                message: 'Account not verified, please verify account'
            });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(login.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }
        const payload = {
            userId: user.id,
            // email: user.email,
            // address: user.address,
        };
        const token = yield (0, jwt_service_1.sign)(payload);
        return res.status(201).json({
            message: 'Successfully login',
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                email: user.email,
                address: user.address,
                role: user.role
            },
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=login.js.map