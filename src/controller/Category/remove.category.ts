import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const oldCtg = await CategoryService.findCategoryById(id)

        if (!oldCtg) {
            return res.status(404).json({
                message: `Category not found by id: ${id} or alredy deleted`
            })
        }

        const removedCtg = await CategoryService.deleteCategory(id)

        return res.status(201).json({
            message: `Category deleted by id: ${id}`,
            category: {
                id: removedCtg.id,
                name: removedCtg.name,
                icon: removedCtg.icon
            }
        })

    } catch (error) {
        next(error)
    }
}