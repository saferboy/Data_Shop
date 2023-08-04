"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const register_1 = __importDefault(require("@controller/auth/register"));
const verify_1 = __importDefault(require("@controller/auth/verify"));
const login_1 = __importDefault(require("@controller/auth/login"));
const resend_code_1 = __importDefault(require("@controller/auth/resend-code"));
const joi_schema_1 = require("@utils/joi.schema");
const validator = (0, express_joi_validation_1.createValidator)();
const router = (0, express_1.Router)()
    .post('/register', validator.body(joi_schema_1.AuthSchemas.register), register_1.default)
    .post('/verify', validator.body(joi_schema_1.AuthSchemas.verify), verify_1.default)
    .post('/login', validator.body(joi_schema_1.AuthSchemas.login), login_1.default)
    .post('/resend', validator.body(joi_schema_1.AuthSchemas.resend), resend_code_1.default);
exports.default = router;
//# sourceMappingURL=auth.js.map