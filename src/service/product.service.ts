import { PrismaClient } from "@prisma/client";
import { ProductData } from "@model/product.dto";

const client = new PrismaClient()

export default class ProductService {

    // static async CreateProduct (item: ProductData, brandId: number, image: number[]) {
    //     return client.product.create({
    //         data: {
    //             title: item.title,
    //             description: item.description,
    //             incomePrice: item.incomePrice,
    //             sellPrice: item.sellPrice,
    //             discount: item.discount,
    //             count: item.count,
    //             // image: {
    //             //     connect: image.map(imageId => ({ id: imageId}))
    //             // },
    //             rating: item.rating,
    //             brandId
    //         }
    //     })
    // }


    static async findProductById(id: number) {
        return client.product.findUnique({
            where: {
                id
            },
            select: {
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
                rating: true
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
}