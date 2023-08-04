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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const verification_dto_1 = require("@model/verification.dto");
const uuid_1 = require("uuid");
const client = new client_1.PrismaClient();
class VerificationService {
    static createVerification(code, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            return client.verification.create({
                data: {
                    id,
                    code,
                    email
                }
            });
        });
    }
    static findVerificationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client.verification.findFirst({
                where: {
                    id
                }
            });
            if (!result) {
                return null;
            }
            const { code, email, createdAt } = result;
            return new verification_dto_1.Verification(id, code, email, new Date(createdAt));
        });
    }
    static findVerificationByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.verification.findFirst({
                where: {
                    email
                }
            });
        });
    }
    static cleanVerification(timeOut) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = new Date().getTime() - timeOut * 1000;
            return client.verification.deleteMany({
                where: {
                    createdAt: {
                        lt: new Date(time)
                    }
                }
            });
        });
    }
}
exports.default = VerificationService;
//# sourceMappingURL=verification.service.js.map