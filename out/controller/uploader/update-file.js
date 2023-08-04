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
        const files = req.files;
        const iconId = +req.params.id;
        if (!files) {
            return res.status(400).json({
                message: "Files not uploaded"
            });
        }
        if (Array.isArray(files)) {
            const dtos = files.map(file => ({
                path: file.filename,
                filename: file.originalname
            }));
            const result = yield file_service_1.default.updateFile(iconId, dtos);
            return res.status(201).json({
                message: "New file uploaded",
                data: result
            });
        }
        else {
            return res.status(400).json({
                message: "Files must be from one field"
            });
        }
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=update-file.js.map