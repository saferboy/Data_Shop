import { PrismaClient } from "@prisma/client";
import { ProductData } from "@model/product.dto";

const client = new PrismaClient()

export default class ProductService {

    static async CreateProduct (item: ProductData, brandId: number, image: number[]) {
        return client.product.create({
            data: {
                title: item.title,
                description: item.description,
                incomePrice: item.incomePrice,
                sellPrice: item.sellPrice,
                discount: item.discount,
                count:  item.count,
                image

            }
        })
    }

}