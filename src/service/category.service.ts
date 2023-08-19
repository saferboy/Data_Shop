import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class CategoryService {

    static async createCategory(title: string, iconId: number) {
        return client.category.create({
            data: {
                title,
                fileId: iconId
            },
            select: {
                id: true,
                title: true,
                fileId: true
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
                file: true
            }
        })
    }

    static async findCategoryById(id: number) {
        return client.category.findUnique({
            where: {
                id
            },
            include: {
                file: true
            }
        })
    }

    static async findAllCategory(page?: number, limit?: number) {
        return client.category.findMany({
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

    static async updateCategoryById(id: number, title: string, iconId: number) {
        return client.category.update({
            where: {
                id
            },
            data: {
                title,
                file: {
                    connect: {
                        id: iconId
                    }
                }
            },
            select: {
                id: true,
                title: true,
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

    static async deleteCategory(id: number) {
        return client.category.delete({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
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