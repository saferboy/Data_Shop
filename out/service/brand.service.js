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
class BrandService {
    static createBrand(title, logoId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.brand.create({
                data: {
                    title,
                    categoryId,
                    logo: {
                        connect: {
                            id: logoId
                        }
                    }
                }
            });
        });
    }
    static allBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            return client.brand.findMany({
                select: {
                    id: true,
                    title: true,
                    logo: {
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
    static findBrandById(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.brand.findUnique({
                where: {
                    id: brandId
                },
                select: {
                    id: true,
                    title: true,
                    logo: {
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
    static findBrandByName(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.brand.findUnique({
                where: {
                    title
                },
                select: {
                    id: true,
                    title: true,
                    logo: {
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
    static updateBrandById(id, title, logoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.brand.update({
                where: {
                    id
                },
                data: {
                    title,
                    logo: {
                        connect: {
                            id: logoId
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    logo: {
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
    static deleteBrand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return client.brand.delete({
                where: {
                    id
                },
                select: {
                    id: true,
                    title: true,
                    logo: {
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
exports.default = BrandService;
//# sourceMappingURL=brand.service.js.map