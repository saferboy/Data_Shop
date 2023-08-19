import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";
import FileService from "@service/file.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const fileId: number = +req.body.fileId
        const title: string = req.body.title

        const oldCategory = await CategoryService.findCategoryByName(title)
        const foundFile = await FileService.findFileById(fileId)

        if (oldCategory) {
            return res.status(404).json({
                message: `Category with ${title} has alredy been created`
            })
        }
        else if (!foundFile) {
            return res.status(400).json({
                message: 'File not found'
            });
        }
        else {

            const newCtg = await CategoryService.createCategory(title, fileId)

            return res.status(201).json({
                message: 'Categroy created',
                category: {
                    id: newCtg.id,
                    title: newCtg.title,
                    file: {
                        id: newCtg.file.id,
                        path: newCtg.file.path,
                        filename: newCtg.file.filename
                    }
                }
            })
        }

    } catch (error) {
        next(error)
    }
}