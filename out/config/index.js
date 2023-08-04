"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = exports.serverConfig = exports.jwtConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwt_config_1 = require("./jwt.config");
Object.defineProperty(exports, "jwtConfig", { enumerable: true, get: function () { return __importDefault(jwt_config_1).default; } });
var server_config_1 = require("./server.config");
Object.defineProperty(exports, "serverConfig", { enumerable: true, get: function () { return __importDefault(server_config_1).default; } });
var verification_1 = require("./verification");
Object.defineProperty(exports, "verification", { enumerable: true, get: function () { return __importDefault(verification_1).default; } });
//# sourceMappingURL=index.js.map