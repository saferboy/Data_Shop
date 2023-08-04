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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client = new client_1.PrismaClient();
class AuthService {
    static createUser(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = bcrypt_1.default.hashSync(detail.password, bcrypt_1.default.genSaltSync(10));
            return client.user.create({
                data: {
                    name: detail.name,
                    surname: detail.surname,
                    phone: detail.phone,
                    email: detail.email,
                    address: detail.address,
                    password: hashPassword
                }
            });
        });
    }
    static excistUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client.user.findMany({
                where: {
                    email
                },
                select: {
                    id: true
                }
            });
            return result.length !== 0;
        });
    }
    static findAdmins(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.user.findMany({
                where: {
                    role
                }
            });
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.user.findFirst({
                where: {
                    email
                }
            });
        });
    }
    static findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.user.findUnique({
                where: {
                    id: userId
                }
            });
        });
    }
    static allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return client.user.findMany();
        });
    }
    static updateUserInfo(id, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = bcrypt_1.default.hashSync(detail.password, bcrypt_1.default.genSaltSync(10));
            return client.user.update({
                where: {
                    id
                },
                data: {
                    name: detail.name,
                    surname: detail.surname,
                    phone: detail.phone,
                    email: detail.email,
                    address: detail.address,
                    password: hashPassword
                }
            });
        });
    }
    static changeUserRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.user.update({
                where: {
                    id
                },
                data: {
                    role
                }
            });
        });
    }
    static removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.user.delete({
                where: {
                    id
                }
            });
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=user.service.js.map