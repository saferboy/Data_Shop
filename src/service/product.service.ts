import { Prisma, PrismaClient } from "@prisma/client";
import { ProductData } from "@model/product.dto";

const client = new PrismaClient()

export default class ProductService {

    static async CreateProduct(item: ProductData, brandId: number, image: number[], categoryId: number) {

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

        if (image && image.length > 0) {
            productData.image = {
                connect: image.map((imageId) => ({ id: imageId })),
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
                image: {
                    connect: image.map(imageId => ({ id: imageId }))
                },
                brandId,
                categoryId
            },
            include: {
                image: {
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
                image: {
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
                image: {
                    select: {
                        id: true,
                        path: true,
                        filename: true
                    }
                }
            }
        })
    }

    static async UpdateProduct(id: number, item: ProductData, image: number[]) {
        const productData: Prisma.ProductUpdateInput = {
            title: item.title,
            description: item.description,
            incomePrice: item.incomePrice,
            sellPrice: item.sellPrice,
            discount: item.discount,
            count: item.count
        };

        if (image && image.length > 0) {
            productData.image = {
                connect: image.map((imageId) => ({ id: imageId })),
            };
        }

        return client.product.update({
            where: {
                id
            },
            data: productData,
            include: {
                image: {
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
            }
        })
    }
}