import { PrismaClient } from "@prisma/client";
import { SchemaData } from "@model/schema.dto";

const client = new PrismaClient()

export default class SchemaService {

    static async createSchema(data: SchemaData) {
        return client.schema.create({
            data: {
                title: data.title,
                keys: {
                    create: data.keys.map(key => ({
                        key: key.key,
                        type: key.type
                    }))
                }
            },
            include: {
                keys: true
            }
        })
    }

    static async findAllSchema(page? : number, limit?: number) {
        return client.schema.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
            include: {
                keys: true
            }
        })
    }

    static async findById(id: number) {
        return client.schema.findUnique({
            where: {
                id
            },
            include: {
                keys: true
            }
        })
    }

    static async deleteSchemaById(id: number) {
        return client.schema.delete({
            where: {
                id
            },
            include: {
                keys: true
            }
        })
    }

}