import { PrismaClient } from "@prisma/client";

import { Express } from "express";
import multer from "multer";
import fs from 'fs'
import * as fsregular from 'node:fs'
import updateCategory from "@controller/Category/updateCategory";

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
        const updateCategory = await client.category.findUnique({ where: { id } });

        if(updateCategory?.icon) {
            fs.unlinkSync(updateCategory.icon)
        }
    }

    static async deleteCategory(id: number) {
        const result = await client.category.delete({
            where: {
                id
            }
        })
        fsregular.rm(result.icon, (error) => {
            console.log("Category icon deleted");
        })
        return result
    }

}