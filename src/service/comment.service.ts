import { Prisma, PrismaClient } from "@prisma/client";
import { CommentData } from "@model/comment.dto";
const client = new PrismaClient()

export default class CommentService {

    static async createComment(userId: number, productId: number, comment: string, rate: number) {
        return client.comment.create({
            data: {
                comment,
                rate,
                productId,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    }

    static async findCommentById(id: number) {
        return client.comment.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    }


    static async allComments(page?: number, limit?: number) {
        return client.comment.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit
        })
    }

    static async updateComment(id: number, item: CommentData) {
        return client.comment.update({
            where: {
                id
            },
            data: {
                comment: item.comment,
                rate: item.rate
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    }

    static async removeComment(id: number) {
        return client.comment.delete({
            where: {
                id
            }
        })
    }
}