import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from 'fs'
import * as fsregular from 'node:fs'
import path from "path";
import { log } from "console";

const client = new PrismaClient()

export default class CategoryService {

    static async createCategory(name: string, icon: string) {
        return client.category.create({
            data: {
                name,
                icon
            }
        })
    }

    static async findCategoryByName(name: string) {
        return client.category.findFirst({
            where: {
                name
            }
        })
    }

    static async findCategoryById(id: number) {
        return client.category.findUnique({
            where: {
                id
            }
        })
    }

    static async findAllCategory() {
        return client.category.findMany({
            include: {
                product: true
            }
        })
    }

    static async updateCategoryById(id: number, name: string, icon: string) {
        const oldCategory = await client.category.findUnique({
            where: { id }
        })
        if (oldCategory) {
            fsregular.rm(path.join(__dirname, '../../upload', oldCategory.icon), (error) => {
                if (error) {
                    console.log(error)
                    return
                }
                // console.log("Category icon deleted");
            })
        }

        return client.category.update({
            where: {
                id
            },
            data: {
                name,
                icon
            }
        })
    }

    static async deleteCategory(id: number) {
        const result = await client.category.delete({
            where: {
                id
            },
            include: {
                product: true
            }
        })
        fsregular.rm(path.join(__dirname, '../../upload', result.icon), (error) => {
            if (error) {
                console.log(error)
                return
            }
            // console.log("Category icon deleted");
        })
        return result
    }

}