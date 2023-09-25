import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class FavoriteService {

    static async createFavorite(userId: number, productId: number) {
        return client.favorite.create({
            data: {
                userId,
                productId
            },
            select: {
                id: true,
                Product: {
                    include: {
                        file: {
                            select: {
                                id: true,
                                path: true,
                                filename: true
                            }
                        }
                    }
                },
                User: true
            }
        })
    }


    static async findFavorite(id: number) {
        return client.favorite.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                Product: {
                    include: {
                        file: {
                            select: {
                                id: true,
                                path: true,
                                filename: true
                            }
                        }
                    }
                },
                User: true
            }
        })
    }


    static async allFavorite(page?: number, limit?: number) {
        return client.favorite.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
            select: {
                id: true,
                Product: {
                    include: {
                        file: {
                            select: {
                                id: true,
                                path: true,
                                filename: true
                            }
                        }
                    }
                },
                User: true
            }
        })
    }


    static async removeFavorite (id: number) {
        return client.favorite.delete({
            where: {
                id
            },
            select: {
                id: true,
                Product: {
                    include: {
                        file: {
                            select: {
                                id: true,
                                path: true,
                                filename: true
                            }
                        }
                    }
                },
                User: true
            }
        })
    }
}