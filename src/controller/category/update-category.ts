import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";
import FileService from "@service/file.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const title = req.body.title
        const iconId: number = +req.body.iconId

        const oldCtg = await CategoryService.findCategoryById(id)

        if (!oldCtg) {
            return res.status(400).json({
                message: `Category not found this id: ${id}`
            });
        }

        const OldFile = await FileService.findFileById(iconId)

        if (!OldFile) {
            return res.status(400).json({
                message: `Icon not found this id: ${iconId}`
            });
        }

        if (oldCtg.title === title && oldCtg.file?.id === iconId) {
            return res.status(304).end();
        }

        const newCtg = await CategoryService.updateCategoryById(id, oldCtg.title == title ? undefined : title, iconId)



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
                icon: {
                    id: newCtg.file?.id,
                    path: newCtg.file?.path,
                    filename: newCtg.file?.filename
                }
            }
        })

    } catch (error) {
        next(error)
    }
}