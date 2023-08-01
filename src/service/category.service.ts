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

    static async findCategoryByName(title: string) {
        return client.category.findFirst({
            where: {
                title
            },
            select: {
                title: true,
                id: true,
                icon: {
                    select: {
                        id: true
                    }
                }
            }
        })
    }

    static async findCategoryById(id: number) {
        return client.category.findUnique({
            where: {
                id
            },
            include: {
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

    static async findAllCategory() {
        return client.category.findMany({
            include: {
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

    static async updateCategoryById(id: number, title: string, iconId: number) {
        return client.category.update({
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

    static async deleteCategory(id: number) {
        return client.category.delete({
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