import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class BrandService {

    static async createBrand(title: string, logoId: number, categoryId: number) {
        return client.brand.create({
            data: {
                title,
                categoryId,
                logo: {
                    connect: {
                        id: logoId
                    }
                },
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
        })
    }

    static async allBrands() {
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
                logo: {
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
                logo: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async updateBrandById(id: number, title: string, logoId: number) {
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
                logo: {
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