import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";
import FileService from "@service/file.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const iconId: number = +req.body.iconId
        const title: string = req.body.title

        const oldCategory = await CategoryService.findCategoryByName(title)
        const foundIcon = await FileService.findFileById(iconId)

        if (oldCategory) {
            return res.status(404).json({
                message: `Category with ${title} has alredy been created`
            })
        }
        else if (!foundIcon) {
            return res.status(400).json({
                message: 'File not found'
            });
        }
        else {

            const newCtg = await CategoryService.createCategory(title, iconId)

            return res.status(201).json({
                message: 'Categroy created',
                category: {
                    id: newCtg.id,
                    title: newCtg.title,
                    icon: foundIcon.id
                }
            })
        }


    } catch (error) {
        next(error)
    }
}