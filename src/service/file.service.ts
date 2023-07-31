import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "node:console";
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

    static async allFile() {
        return client.file.findMany({
            select: {
                id: true,
                path: true,
                filename: true
            }
        })
    }

    static async updateFile(iconId: number, dtos: CreatDto[]) {
        const oldFile = await client.file.findUnique({
            where: { id: iconId }
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
                    id: iconId
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

    static async deleteFile(iconId: number) {
        return client.file.delete({
            where: {
                id: iconId
            }
        })
    }

} 
