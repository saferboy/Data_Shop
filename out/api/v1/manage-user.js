"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const update_user_own_info_1 = __importDefault(require("@controller/user/update-user-own-info"));
const all_user_1 = __importDefault(require("@controller/user/all-user"));
const update_user_role_1 = __importDefault(require("@controller/user/update-user-role"));
const remove_user_1 = __importDefault(require("@controller/user/remove-user"));
const find_user_by_id_1 = __importDefault(require("@controller/user/find-user-by-id"));
const all_admins_1 = __importDefault(require("@controller/user/all-admins"));
const joi_schema_1 = require("@utils/joi.schema");
const validator = (0, express_joi_validation_1.createValidator)();
const permission_1 = require("@middleware/permission");
const router = (0, express_1.Router)()
    .get('/users', (0, permission_1.permission)(['admin', 'supervisor']), all_user_1.default)
    .get('/admins', (0, permission_1.permission)(['supervisor']), all_admins_1.default)
    .get('/:id', validator.params(joi_schema_1.ManageUser.finduser), (0, permission_1.permission)(['admin' || 'supervisor']), find_user_by_id_1.default)
    .put('/:id', validator.body(joi_schema_1.ManageUser.updatUser), (0, permission_1.permission)(['user']), update_user_own_info_1.default)
    .put('/role/:id', validator.params(joi_schema_1.ManageUser.finduser), validator.body(joi_schema_1.ManageUser.changeRole), (0, permission_1.permission)(['supervisor']), update_user_role_1.default)
    .delete('/:id', validator.params(joi_schema_1.ManageUser.deleteUser), (0, permission_1.permission)(['supervisor']), remove_user_1.default);
exports.default = router;
//# sourceMappingURL=manage-user.js.map