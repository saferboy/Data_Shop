import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const title: string = req.body.title

        const oldCategory = await CategoryService.findCategoryByName(title)

        if (oldCategory) {
            return res.status(404).json({
                message: `Category with ${title} has alredy been created`
            })
        } else {

            const newCtg = await CategoryService.createCategory(title)

            return res.status(201).json({
                message: 'Categroy created',
                category: {
                    id: newCtg.id,
                    title: newCtg.title,
                }
            })
        }

    } catch (error) {
        next(error)
    }
}