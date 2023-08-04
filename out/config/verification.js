"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.EMAIL = exports.SECRET_KEY = exports.VERIFICATION_TIMEOUT = void 0;
exports.VERIFICATION_TIMEOUT = +process.env.VERIFICATION_TIMEOUT;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.EMAIL = process.env.EMAIL;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.default = {
    VERIFICATION_TIMEOUT: exports.VERIFICATION_TIMEOUT,
    SECRET_KEY: exports.SECRET_KEY,
    EMAIL: exports.EMAIL,
    EMAIL_PASSWORD: exports.EMAIL_PASSWORD
};
//# sourceMappingURL=verification.js.map