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
                message: 'Category not found'
            });
        }

        if (oldCtg.icon) {
            await FileService.deleteFile(oldCtg.id)
        }

        if (oldCtg.icon?.id == iconId) {
            return res.status(304).json({
                message: 'esd'
            });
        }

        const newCtg = await CategoryService.updateCategoryById(id, oldCtg.title == title ? undefined : title, iconId)

        if (oldCtg.title == newCtg.title) {
            return res.status(200).json({
                message: 'Siz hech qanday o\'zgarish kiritmadingiz'
            });
        }


        return res.status(201).json({
            message: 'Category updated',
            category: {
                id: newCtg.id,
                title: newCtg.title,
                icon: newCtg.icon?.id
            }
        })

    } catch (error) {
        next(error)
    }
}