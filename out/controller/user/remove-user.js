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
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const oldUser = yield user_service_1.default.findUserById(id);
        if (!oldUser) {
            return res.status(404).json({
                message: 'User not found or alredy deleted'
            });
        }
        const deletedUser = yield user_service_1.default.removeUser(id);
        return res.status(200).json({
            message: 'User removed',
            user: {
                id: deletedUser.id,
                name: deletedUser.name,
                surname: deletedUser.surname,
                phone: deletedUser.phone,
                email: deletedUser.email,
                address: deletedUser.address,
                password: deletedUser.password,
                role: deletedUser.role
            }
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=remove-user.js.map