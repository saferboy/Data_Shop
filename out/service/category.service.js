"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
class CategoryService {
    static createCategory(title, iconId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.category.create({
                data: {
                    title,
                    icon: {
                        connect: {
                            id: iconId
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    icon: {
                        select: {
                            id: true,
                            path: true,
                            filename: true
                        }
                    }
                }
            });
        });
    }
    static findCategoryByName(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.category.findFirst({
                where: {
                    title
                },
                select: {
                    title: true,
                    id: true,
                    icon: {
                        select: {
                            id: true
                        }
                    }
                }
            });
        });
    }
    static findCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.category.findUnique({
                where: {
                    id
                },
                include: {
                    icon: {
                        select: {
                            id: true,
                            path: true,
                            filename: true
                        }
                    }
                }
            });
        });
    }
    static findAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return client.category.findMany({
                include: {
                    icon: {
                        select: {
                            id: true,
                            path: true,
                            filename: true
                        }
                    }
                }
            });
        });
    }
    static updateCategoryById(id, title, iconId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.category.update({
                where: {
                    id
                },
                data: {
                    title,
                    icon: {
                        connect: {
                            id: iconId
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    icon: {
                        select: {
                            id: true,
                            path: true,
                            filename: true
                        }
                    }
                }
            });
        });
    }
    static deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.category.delete({
                where: {
                    id
                },
                select: {
                    id: true,
                    title: true,
                    icon: {
                        select: {
                            id: true,
                            path: true,
                            filename: true
                        }
                    }
                }
            });
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map