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
        const detail = req.body;
        const user = yield user_service_1.default.findUserById(id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        const newInfo = yield user_service_1.default.updateUserInfo(id, detail);
        return res.status(200).json({
            message: "Update user info",
            user: {
                id: newInfo.id,
                name: newInfo.name,
                surname: newInfo.surname,
                phone: newInfo.phone,
                email: newInfo.email,
                address: newInfo.address,
                password: newInfo.password
            }
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=update-user-own-info.js.map