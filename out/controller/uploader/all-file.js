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
const file_service_1 = __importDefault(require("@service/file.service"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFile = yield file_service_1.default.allFile();
        const mapped = allFile.map(file => {
            return {
                id: file.id,
                path: file.path,
                filename: file.filename
            };
        });
        return res.status(200).json({
            message: 'Retrive all files',
            files: mapped
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=all-file.js.map