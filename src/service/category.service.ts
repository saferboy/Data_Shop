import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class CategoryService {

    static async createCategory(title: string, fileId: number) {
        return client.category.create({
            data: {
                title,
                fileId
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

    static async findCategoryByName(title: string) {
        return client.category.findFirst({
            where: {
                title
            },
            select: {
                title: true,
                id: true,
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

    static async findCategoryById(id: number) {
        return client.category.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                file: true
            }
        })
    }

    static async findAllCategory(page?: number, limit?: number) {
        return client.category.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
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

    static async updateCategoryById(id: number, title: string, fileId: number) {
        return client.category.update({
            where: {
                id
            },
            data: {
                title,
                fileId
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

