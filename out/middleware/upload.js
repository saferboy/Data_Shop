"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./upload");
    },
    filename: (req, file, callback) => {
        callback(null, (0, uuid_1.v4)() + ".png");
    },
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=upload.js.map