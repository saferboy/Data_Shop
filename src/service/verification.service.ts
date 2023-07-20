import { PrismaClient } from "@prisma/client";
import { Verification } from "@model/verification.dto";
import { v4 as uuid } from 'uuid'


const client = new PrismaClient()

export default class VerificationService {

    static async createVerification(code: string, email: string) {
        const id = uuid()

        return client.verification.create({
            data: {
                id,
                code,
                email
            }
        })
    }

    static async findVerificationById(id: string) {
        const result = await client.verification.findFirst({
            where: {
                id
            }
        })

        if (!result) {
            return null;
        }

        const { code, email, createdAt } = result;

        return new Verification(id, code, email, new Date(createdAt));
    }

    static async findVerificationByEmail(email: string) {
        return client.verification.findFirst({
            where: {
                email
            }
        })
    }

    static async cleanVerification(timeOut: number) {
        const time = new Date().getTime() - timeOut * 1000;

        return client.verification.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(time)
                }
            }
        })
    }


}