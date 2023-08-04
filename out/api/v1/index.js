"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// v1 imports
const category_1 = __importDefault(require("./category"));
const auth_1 = __importDefault(require("./auth"));
const manage_user_1 = __importDefault(require("./manage-user"));
const upload_1 = __importDefault(require("./upload"));
const router = (0, express_1.Router)()
    .use('/category', category_1.default)
    .use('/auth', auth_1.default)
    .use('/user', manage_user_1.default)
    .use('/upload', upload_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map