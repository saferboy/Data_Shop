"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (error, req, res, next) => {
    console.log(`[ERROR] ${req.method} ${req.originalUrl} -> ${error.message}`);
    res.status(500).send({
        message: 'Internal server message' + error.message
    });
};
//# sourceMappingURL=error-handler.js.map