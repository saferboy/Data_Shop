import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

interface CreateInput {
    name: string
    surname: string
    username: string
    password: string
}

export default class SupervisorService {
    static async create(data: CreateInput) {
        return client.superVisor.create({
            data: {
                name: data.name,
                surname: data.surname,
                user: {
                    username: data.username,
                    password: data.password,
                    type: "supervisor"
                }
            }
        })
    }
}