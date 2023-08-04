"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_category_1 = __importDefault(require("@controller/category/create-category"));
const find_category_1 = __importDefault(require("@controller/category/find-category"));
const all_category_1 = __importDefault(require("@controller/category/all-category"));
const update_category_1 = __importDefault(require("@controller/category/update-category"));
const remove_category_1 = __importDefault(require("@controller/category/remove-category"));
const joi_schema_1 = require("@utils/joi.schema");
const express_joi_validation_1 = require("express-joi-validation");
const validator = (0, express_joi_validation_1.createValidator)();
const permission_1 = require("@middleware/permission");
const router = (0, express_1.Router)()
    .post('/', (0, permission_1.permission)(['admin', 'supervisor']), validator.body(joi_schema_1.CategorySchema.CreateCtg), create_category_1.default)
    .get('/:id', (0, permission_1.permission)(['none', 'user', 'admin', 'supervisor']), validator.params(joi_schema_1.CategorySchema.findCtg), find_category_1.default)
    .get('/', (0, permission_1.permission)(['none', 'user', 'admin', 'supervisor']), all_category_1.default)
    .put('/:id', (0, permission_1.permission)(['admin', 'supervisor']), update_category_1.default)
    .delete('/:id', (0, permission_1.permission)(['admin', 'supervisor']), remove_category_1.default);
exports.default = router;
//# sourceMappingURL=category.js.map