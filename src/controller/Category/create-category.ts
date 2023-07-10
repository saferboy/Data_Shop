import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const name = req.body.name

        const oldCategory = await CategoryService.findCategoryByName(name)

        if (oldCategory) {
            return res.status(404).json({
                message: `Category with ${name} has alredy been created`
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "File not upload"
            })
        }

        const icon = req.file.filename

        const newCtg = await CategoryService.createCategory(name, icon)

        return res.status(201).json({
            message: 'Categroy created',
            category: {
                id: newCtg.id,
                name: newCtg.name,
                icon: newCtg.icon
            }
        })

    } catch (error) {
        next(error)
    }
}