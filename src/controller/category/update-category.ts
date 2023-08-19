import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";
import FileService from "@service/file.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const title = req.body.title
        const fileId: number = +req.body.iconId

        const oldCtg = await CategoryService.findCategoryById(id)

        if (!oldCtg) {
            return res.status(400).json({
                message: `Category not found this id: ${id}`
            });
        }

        const OldFile = await FileService.findFileById(fileId)

        if (!OldFile) {
            return res.status(400).json({
                message: `Icon not found this id: ${fileId}`
            });
        }

        const newCtg = await CategoryService.updateCategoryById(id, oldCtg.title == title ? undefined : title, fileId)

        if (newCtg.title === oldCtg.title && newCtg.file?.id === oldCtg.file?.id) {
            return res.status(200).json({
                message: 'Category data is the same, no changes were made'
            });
        }

        if (!newCtg.file) {
            return res.status(400).json({
                message: 'File not found'
            })
        }

        return res.status(201).json({
            message: 'Category updated',
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

    } catch (error) {
        next(error)
    }
}