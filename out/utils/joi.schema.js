"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = exports.ManageUser = exports.AuthSchemas = void 0;
const joi_1 = __importDefault(require("joi"));
class AuthSchemas {
}
exports.AuthSchemas = AuthSchemas;
AuthSchemas.register = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    surname: joi_1.default.string().min(1).required(),
    phone: joi_1.default.string().min(1).max(40).required(),
    email: joi_1.default.string().email().min(1).max(40).required(),
    address: joi_1.default.string().min(1).required(),
    password: joi_1.default.string().min(1).required()
});
AuthSchemas.verify = joi_1.default.object({
    code: joi_1.default.string().min(1).required(),
    verificationId: joi_1.default.string().min(0),
});
AuthSchemas.login = joi_1.default.object({
    email: joi_1.default.string().email().min(1).required(),
    password: joi_1.default.string().min(1).required(),
});
AuthSchemas.resend = joi_1.default.object({
    email: joi_1.default.string().email().min(1).required(),
});
class ManageUser {
}
exports.ManageUser = ManageUser;
ManageUser.finduser = joi_1.default.object({
    id: joi_1.default.number().min(1).required()
});
ManageUser.updatUser = joi_1.default.object({
    id: joi_1.default.number().min(1),
    name: joi_1.default.string().min(1).required(),
    surname: joi_1.default.string().min(1).required(),
    phone: joi_1.default.string().min(1).required(),
    email: joi_1.default.string().email().min(1).required(),
    address: joi_1.default.string().min(1).required(),
    password: joi_1.default.string().min(1).required()
});
ManageUser.changeRole = joi_1.default.object({
    role: joi_1.default.string().min(1).required()
});
ManageUser.deleteUser = joi_1.default.object({
    id: joi_1.default.number().min(1).required()
});
class CategorySchema {
}
exports.CategorySchema = CategorySchema;
CategorySchema.CreateCtg = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    iconId: joi_1.default.number().min(1).required()
});
CategorySchema.findCtg = joi_1.default.object({
    id: joi_1.default.number().min(1).required()
});
//# sourceMappingURL=joi.schema.js.map