import { Request, Response, NextFunction } from "express";

import CategoryService from "@service/category.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const find = await CategoryService.findCategoryById(id)

        if (!find) {
            return res.status(404).json({
                message: `Category not found this id: ${id}`
            })
        }

        return res.status(201).json({
            message: `Retrive category by id: ${id}`,
            category: {
                id: find.id,
                name: find.name,
                icon: find.icon
            }
        })

    } catch (error) {
        next(error)
    }
}