import { PrismaClient, role } from "@prisma/client";
import { Userbody } from '@model/index'
import bcrypt from 'bcrypt'

const client = new PrismaClient()


export default class AuthService {

    static async createUser(detail: Userbody) {
        const hashPassword = bcrypt.hashSync(detail.password, bcrypt.genSaltSync(10))

        return client.user.create({
            data: {
                name: detail.name,
                surname: detail.surname,
                phone: detail.phone,
                email: detail.email,
                address: detail.address,
                password: hashPassword
            }
        })
    }

    static async excistUser(email: string): Promise<boolean> {
        const result = await client.user.findMany({
            where: {
                email
            },
            select: {
                id: true
            }
        })

        return result.length !== 0
    }

    static async findUserByEmail(email: string) {
        return client.user.findFirst({
            where: {
                email
            }
        })
    }

    static async findUserById(userId: number) {
        return client.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    static async allUsers() {
        return client.user.findMany()
    }

    static async updateUserInfo(id: number, detail: Userbody) {
        const hashPassword = bcrypt.hashSync(detail.password, bcrypt.genSaltSync(10));

        return client.user.update({
            where: {
                id
            },
            data: {
                name: detail.name,
                surname: detail.surname,
                phone: detail.phone,
                email: detail.email,
                address: detail.address,
                password: hashPassword
            }
        });
    }

    static async changeUserRole(id: number, role: role) {
        return client.user.update({
            where: {
                id
            },
            data: {
                role
            }
        })
    }

    static async removeUser(id: number) {
        return client.user.delete({
            where: {
                id
            }
        })
    }

}

