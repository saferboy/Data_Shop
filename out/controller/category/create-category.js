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
        const iconId = +req.body.iconId;
        const title = req.body.title;
        const oldCategory = yield category_service_1.default.findCategoryByName(title);
        const foundIcon = yield file_service_1.default.findFileById(iconId);
        if (oldCategory) {
            return res.status(404).json({
                message: `Category with ${title} has alredy been created`
            });
        }
        else if (!foundIcon) {
            return res.status(400).json({
                message: 'File not found'
            });
        }
        else {
            const newCtg = yield category_service_1.default.createCategory(title, iconId);
            return res.status(201).json({
                message: 'Categroy created',
                category: {
                    id: newCtg.id,
                    title: newCtg.title,
                    icon: {
                        id: (_a = newCtg.icon) === null || _a === void 0 ? void 0 : _a.id,
                        path: (_b = newCtg.icon) === null || _b === void 0 ? void 0 : _b.path,
                        filename: (_c = newCtg.icon) === null || _c === void 0 ? void 0 : _c.filename
                    }
                }
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=create-category.js.map