import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class BrandService {

    static async createBrand(title: string, iconId: number, categoryId: number) {
        return client.brand.create({
            data: {
                title,
                categoryId,
                icon: {
                    connect: {
                        id: iconId
                    }
                },
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
        })
    }

    static async allBrands(page?: number, limit?: number) {
        return client.brand.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
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
                icon: {
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
                icon: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async updateBrandById(id: number, title: string, iconId: number) {
        return client.brand.update({
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
                icon: {
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