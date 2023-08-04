"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("@middleware/upload");
const upload_files_1 = __importDefault(require("@controller/uploader/upload-files"));
const all_file_1 = __importDefault(require("@controller/uploader/all-file"));
const find_file_1 = __importDefault(require("@controller/uploader/find-file"));
const update_file_1 = __importDefault(require("@controller/uploader/update-file"));
const delete_file_1 = __importDefault(require("@controller/uploader/delete-file"));
const permission_1 = require("@middleware/permission");
const router = (0, express_1.Router)()
    .post('/', upload_1.upload.array('files'), upload_files_1.default)
    .get('/files', (0, permission_1.permission)(['admin', 'supervisor']), all_file_1.default)
    .get('/:id', (0, permission_1.permission)(['admin', 'supervisor']), find_file_1.default)
    .put('/:id', (0, permission_1.permission)(['admin', 'supervisor']), upload_1.upload.array('files'), update_file_1.default)
    .delete('/:id', delete_file_1.default);
exports.default = router;
//# sourceMappingURL=upload.js.map