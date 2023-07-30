import { PrismaClient } from "@prisma/client";
import * as fsregular from 'node:fs'
import path from "path";

const client = new PrismaClient()

export default class CategoryService {

    static async createCategory(title: string, iconId: number) {
        return client.category.create({
            data: {
                title,
                icon: {
                    connect: {
                        id: iconId
                    }
                }
            }
        })
    }

    static async findCategoryByName(title: string) {
        return client.category.findFirst({
            where: {
                title
            }
        })
    }

    static async findCategoryById(id: number) {
        return client.category.findUnique({
            where: {
                id
            },
            include: {
                brand: true,
                icon: true,
                product: true
            }
        })
    }

    static async findAllCategory() {
        return client.category.findMany({
            include: {
                icon: true,
                product: true,
                brand: true
            }
        })
    }

    // static async updateCategoryById(id: number, title: string, icon: string) {
    //     const oldCategory = await client.category.findUnique({
    //         where: { id }
    //     })

    //     if (oldCategory) {
    //         fsregular.rm(path.join(__dirname, '../../upload', oldCategory.icon), (error) => {
    //             if (error) {
    //                 console.log(error)
    //                 return
    //             }
    //             console.log("Old category icon deleted");
    //         })
    //     }

    //     return client.category.update({
    //         where: {
    //             id
    //         },
    //         data: {
    //             title
    //         }
    //     })
    // }

    // static async deleteCategory(id: number) {
    //     const result = await client.category.delete({
    //         where: {
    //             id
    //         },
    //         include: {
    //             product: true
    //         }
    //     })
    //     fsregular.rm(path.join(__dirname, '../../upload', result.icon), (error) => {
    //         if (error) {
    //             console.log(error)
    //             return
    //         }
    //         // console.log("Category icon deleted");
    //     })
    //     return result
    // }
}