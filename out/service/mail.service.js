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
exports.sendEmail = void 0;
const verification_1 = require("@config/verification");
const nodemailer_1 = __importDefault(require("nodemailer"));
const smtp_transport_1 = __importDefault(require("nodemailer/lib/smtp-transport"));
const transporter = nodemailer_1.default.createTransport(new smtp_transport_1.default({
    service: 'gmail',
    host: 'smpt.gmail.com',
    auth: {
        user: verification_1.EMAIL,
        pass: verification_1.EMAIL_PASSWORD
    }
}));
const sendEmail = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOption = {
        from: verification_1.EMAIL,
        to: verification_1.EMAIL,
        subject: 'Email verification',
        text: `${email}, This is code to verify account : ${code}`
    };
    const info = yield transporter.sendMail(mailOption);
    console.log('Send mail' + info.response);
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=mail.service.js.map