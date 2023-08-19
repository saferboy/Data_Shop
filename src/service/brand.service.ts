import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class BrandService {

    static async createBrand(title: string, fileId: number, categoryId: number) {
        return client.brand.create({
            data: {
                title,
                categoryId,
                fileId
            },
            select: {
                id: true,
                title: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async allBrands(page?: number, limit?: number) {
        return client.brand.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
            select: {
                id: true,
                title: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async findBrandById(brandId: number) {
        return client.brand.findUnique({
            where: {
                id: brandId
            },
            select: {
                id: true,
                title: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async findBrandByName(title: string) {
        return client.brand.findFirst({
            where: {
                title
            },
            select: {
                id: true,
                title: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async updateBrandById(id: number, title: string, fileId: number) {
        return client.brand.update({
            where: {
                id
            },
            data: {
                title,
                fileId
            },
            select: {
                id: true,
                title: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async deleteBrand(id: number) {
        return client.brand.delete({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

}