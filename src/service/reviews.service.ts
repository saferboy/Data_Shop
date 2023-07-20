import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class ReviewsService {

    static async createReview(userId: number, id: number, comment: string) {
        return client.reviews.create({
            data: {
                userId,
                productId: id,
                comment
            }
        })
    }

    static async allReview() {
        return client.reviews.findMany()
    }


    static async findReviewById(id: number) {
        return client.reviews.findUnique({
            where: {
                id
            }
        })
    }

      
}