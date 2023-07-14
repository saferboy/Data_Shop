import { PrismaClient } from "@prisma/client";
import { ProductBody } from '@model/index'
import * as fsregular from 'node:fs'
import path from "path";


const client = new PrismaClient()

export default class ProductService {

    static async CreateProduct(id: number, productInfo: ProductBody, image: string) {
        return client.product.create({
            data: {
                categoryId: id,
                name: productInfo.name,
                price: productInfo.price,
                image,
                description: productInfo.description
            },
            include: {
                category: true,
                details: true,
                reviews: true
            }
        })
    }

    static async AllProducts() {
        return client.product.findMany({
            include: {
                category: true,
                details: true,
                reviews: true
            }
        })
    }

    static async findProductById(id: number) {
        return client.product.findUnique({
            where: {
                id
            },
            include: {
                category: true,
                details: true,
                reviews: true
            }
        })
    }

    static async updateProduct(id: number, newProduct: ProductBody, image: string) {
        const oldProduct = await client.product.findUnique({
            where: { id }
        })
        if (oldProduct) {
            fsregular.rm(path.join(__dirname, '../../upload', oldProduct.image), (error) => {
                if (error) {
                    console.log(error)
                    return
                }
            })
        }

        return client.product.update({
            where: {
                id
            },
            data: {
                name: newProduct.name,
                price: newProduct.price,
                description: newProduct.description,
                image
            }
        })
    }

    static async deleteProduct(id: number) {
        const result = await client.product.delete({
            where: {
                id
            },
            include: {
                reviews: true,
                details: true
            }
        })

        fsregular.rm(path.join(__dirname, '../../upload', result.image), (error) => {
            if (error) {
                console.log(error)
                return
            }
        })
        return result
    }
}