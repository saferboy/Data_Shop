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
// import { role } from '@prisma/client';
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const role = req.body.role;
        const oldUser = yield user_service_1.default.findUserById(id);
        if (!oldUser) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        const newUserRole = yield user_service_1.default.changeUserRole(id, role);
        return res.status(200).json({
            message: "User's role has changed",
            user: {
                id: newUserRole.id,
                name: newUserRole.name,
                role: newUserRole.role
            }
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=update-user-role.js.map