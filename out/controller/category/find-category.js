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
// import { deflate } from "node:zlib";
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const find = yield category_service_1.default.findCategoryById(id);
        if (!find) {
            return res.status(404).json({
                message: `Category not found this id: ${id}`
            });
        }
        return res.status(201).json({
            message: `Retrive category by id: ${id}`,
            category: {
                id: find.id,
                title: find.title,
                icon: find.icon
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=find-category.js.map