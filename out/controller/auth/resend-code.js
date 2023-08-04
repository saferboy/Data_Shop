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
const verification_service_1 = __importDefault(require("@service/verification.service"));
const user_service_1 = __importDefault(require("@service/user.service"));
const verification_1 = require("@config/verification");
const mail_service_1 = require("@service/mail.service");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resend = req.body;
        const user = yield user_service_1.default.findUserByEmail(resend.email);
        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const code = (0, generateCode_1.generateCode)();
        const verification = yield verification_service_1.default.createVerification(code, user.email);
        if (verification == null) {
            return res.status(400).json({
                message: 'Cannot save verification'
            });
        }
        yield (0, mail_service_1.sendEmail)(user.email, code);
        return res.status(200).json({
            message: 'Verification code sended to email',
            email: user.email,
            verificationId: verification.id,
            timeOut: (0, generateCode_1.getTimeOut)(verification.createdAt, verification_1.VERIFICATION_TIMEOUT)
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=resend-code.js.map