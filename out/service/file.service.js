"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fsregular = __importStar(require("node:fs"));
const path_1 = __importDefault(require("path"));
const client = new client_1.PrismaClient();
class FileService {
    static createFile(dtos) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = [];
            for (let dto of dtos) {
                const file = yield client.file.create({
                    data: {
                        path: dto.path,
                        filename: dto.filename
                    },
                    select: {
                        id: true,
                        filename: true,
                        path: true
                    }
                });
                files.push(file);
            }
            return files;
        });
    }
    static findFileById(iconId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.file.findUnique({
                where: {
                    id: iconId
                },
                select: {
                    id: true,
                    path: true,
                    filename: true
                }
            });
        });
    }
    static allFile() {
        return __awaiter(this, void 0, void 0, function* () {
            return client.file.findMany({
                select: {
                    id: true,
                    path: true,
                    filename: true
                }
            });
        });
    }
    static updateFile(iconId, dtos) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldFile = yield client.file.findUnique({
                where: { id: iconId }
            });
            if (oldFile) {
                fsregular.rm(path_1.default.join(__dirname, '../../upload', oldFile.path), (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log("Old file image deleted");
                });
            }
            const files = [];
            for (let dto of dtos) {
                const file = yield client.file.update({
                    data: {
                        path: dto.path,
                        filename: dto.filename
                    },
                    where: {
                        id: iconId
                    },
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                });
                files.push(file);
            }
            return files;
        });
    }
    static deleteFile(iconId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileToDelete = yield client.file.findUnique({
                where: {
                    id: iconId
                }
            });
            if (!fileToDelete) {
                throw new Error('File not found');
            }
            const result = yield client.file.delete({
                where: {
                    id: iconId
                }
            });
            fsregular.rm(path_1.default.join(__dirname, '../../upload', result.path), (error) => {
                if (error) {
                    console.log(error);
                    return;
                }
            });
            return result;
        });
    }
}
exports.default = FileService;
//# sourceMappingURL=file.service.js.map