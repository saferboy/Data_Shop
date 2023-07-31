import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient()

type CreatDto = {
    path: string,
    filename: string
}


export default class FileService {

    static async createFile(dtos: CreatDto[]) {

        const files: {
            id: number,
            path: string,
            filename: string
        }[] = []

        for (let dto of dtos) {
            const file = await client.file.create({
                data: {
                    path: dto.path,
                    filename: dto.filename
                },
                select: {
                    id: true,
                    filename: true,
                    path: true
                }
            })

            files.push(file)
        }

        return files
    }


    static async findFileById(iconId: number) {
        return client.file.findUnique({
            where: {
                id: iconId
            },
            select: {
                id: true,
                path: true,
                filename: true
            }
        })
    }

} 
