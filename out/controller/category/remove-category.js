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
const category_service_1 = __importDefault(require("@service/category.service"));
const file_service_1 = __importDefault(require("@service/file.service"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const id = +req.params.id;
        const oldCtg = yield category_service_1.default.findCategoryById(id);
        if (!oldCtg) {
            return res.status(404).json({
                message: 'Category not found or alredy deleted'
            });
        }
        const removedCtg = yield category_service_1.default.deleteCategory(id);
        if (removedCtg.icon) {
            yield file_service_1.default.deleteFile(removedCtg.icon.id);
        }
        return res.status(201).json({
            message: `Category deleted by id: ${id}`,
            category: {
                id: removedCtg.id,
                title: removedCtg.title,
                icon: {
                    id: (_a = removedCtg.icon) === null || _a === void 0 ? void 0 : _a.id,
                    path: (_b = removedCtg.icon) === null || _b === void 0 ? void 0 : _b.path,
                    filename: (_c = removedCtg.icon) === null || _c === void 0 ? void 0 : _c.filename
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=remove-category.js.map