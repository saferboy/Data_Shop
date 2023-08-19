import { Prisma, PrismaClient } from "@prisma/client";
import * as fsregular from 'node:fs'
import path from "path";


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


    static async findFileById(id: number) {
        return client.file.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                path: true,
                filename: true
            }
        })
    }

    static async allFile(page?: number, limit?: number) {
        return client.file.findMany({
            skip: page ? ((page - 1) * (limit ?? 0)) + 1 : undefined,
            take: limit,
            select: {
                id: true,
                path: true,
                filename: true
            }
        })
    }

    static async updateFile(fileId: number, dtos: CreatDto[]) {
        const oldFile = await client.file.findUnique({
            where: { id: fileId }
        })

        if (oldFile) {
            fsregular.rm(path.join(__dirname, '../../upload', oldFile.path), (error) => {
                if (error) {
                    console.log(error)
                    return
                }
                console.log("Old file image deleted");
            })
        }

        const files: {
            id: number,
            path: string,
            filename: string
        }[] = []

        for (let dto of dtos) {
            const file = await client.file.update({
                data: {
                    path: dto.path,
                    filename: dto.filename
                },
                where: {
                    id: fileId
                },
                select: {
                    id: true,
                    path: true,
                    filename: true
                }
            })

            files.push(file)
        }

        return files
    }

    static async deleteFile(id: number) {

        const fileToDelete = await client.file.findUnique({
            where: {
                id
            }
        })

        if (!fileToDelete) {
            throw new Error('File not found');
        }

        const result = await client.file.delete({
            where: {
                id
            }
        })
        fsregular.rm(path.join(__dirname, '../../upload', result.path), (error) => {
            if (error) {
                console.log(error)
                return
            }
        })
        return result

    }
} 
