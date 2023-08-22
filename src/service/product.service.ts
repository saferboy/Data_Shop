import { Prisma, PrismaClient } from "@prisma/client";
import { ProductData } from "@model/product.dto";

const client = new PrismaClient()

export default class ProductService {

    static async CreateProduct(item: ProductData, brandId: number, file: number[], categoryId: number) {

        const productData: Prisma.ProductCreateInput = {
            title: item.title,
            description: item.description,
            incomePrice: item.incomePrice,
            sellPrice: item.sellPrice,
            discount: item.discount,
            count: item.count,
            brand: {
                connect: {
                    id: brandId
                }
            },
            category: {
                connect: {
                    id: categoryId
                }
            },
        };

        if (file && file.length > 0) {
            productData.file = {
                connect: file.map((fileId) => ({ id: fileId })),
            };
        }

        return client.product.create({
            data: {
                title: item.title,
                description: item.description,
                incomePrice: item.incomePrice,
                sellPrice: item.sellPrice,
                discount: item.discount,
                count: item.count,
                file: {
                    connect: file.map(fileId => ({ id: fileId }))
                },
                brandId,
                categoryId
            },
            include: {
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


    static async findProductById(id: number) {
        return client.product.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                description: true,
                incomePrice: true,
                sellPrice: true,
                discount: true,
                count: true,
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                },
                rating: true,
                brandId: true,
                categoryId: true,

            }
        })
    }

    static async allProducts(page?: number, limit?: number) {
        return client.product.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
            include: {
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

    static async UpdateProduct(id: number, item: ProductData, file: number[]) {
        const productData: Prisma.ProductUpdateInput = {
            title: item.title,
            description: item.description,
            incomePrice: item.incomePrice,
            sellPrice: item.sellPrice,
            discount: item.discount,
            count: item.count,
        };

        if (file && file.length > 0) {
            productData.file = {
                connect: file.map((fileId) => ({ id: fileId })),
            };
        }


        return client.product.update({
            where: {
                id
            },
            data: {
                title: item.title,
                description: item.description,
                incomePrice: item.incomePrice,
                sellPrice: item.sellPrice,
                discount: item.discount,
                count: item.count,
                file: productData.file
            },
            include: {
                file: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        });
    }

    static async deleteProduct(id: number) {
        return client.product.delete({
            where: {
                id
            },
            select: {
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