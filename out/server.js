"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./api/router"));
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', router_1.default);
app.use('/upload', express_1.default.static(node_path_1.default.join(__dirname, '../upload')));
app.listen(port, () => {
    console.log(`Server http://localhost:${port} portda ishga tushdi.`);
});
//# sourceMappingURL=server.js.map