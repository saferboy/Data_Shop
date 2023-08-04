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
    var _a, _b, _c, _d, _e, _f;
    try {
        const id = +req.params.id;
        const title = req.body.title;
        const iconId = +req.body.iconId;
        const oldCtg = yield category_service_1.default.findCategoryById(id);
        if (!oldCtg) {
            return res.status(400).json({
                message: 'Category not found'
            });
        }
        if (oldCtg.icon) {
            yield file_service_1.default.deleteFile(oldCtg.icon.id);
        }
        const newCtg = yield category_service_1.default.updateCategoryById(id, oldCtg.title == title ? undefined : title, iconId);
        if (((_a = oldCtg.icon) === null || _a === void 0 ? void 0 : _a.id) == ((_b = newCtg.icon) === null || _b === void 0 ? void 0 : _b.id)) {
            return res.status(200).json({
                message: 'File not change'
            });
        }
        // if (oldCtg.title == newCtg.title) {
        //     return res.status(200).json({
        //         message: 'Siz hech qanday o\'zgarish kiritmadingiz'
        //     });
        // }
        if (!((_c = newCtg.icon) === null || _c === void 0 ? void 0 : _c.id)) {
            return res.status(400).json({
                message: 'File not found'
            });
        }
        return res.status(201).json({
            message: 'Category updated',
            category: {
                id: newCtg.id,
                title: newCtg.title,
                icon: {
                    id: (_d = newCtg.icon) === null || _d === void 0 ? void 0 : _d.id,
                    path: (_e = newCtg.icon) === null || _e === void 0 ? void 0 : _e.path,
                    filename: (_f = newCtg.icon) === null || _f === void 0 ? void 0 : _f.filename
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=update-category.js.map