import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export async function addRasmlar(categoryId: number, files) {
    for (const file of files) {
        await client.file.create({
            path: file.path,
            filename: file.filename,
            categoryId: categoryId,
        });
    }
}
 
