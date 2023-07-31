import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const title = req.body.title
        const iconId: number = +req.body.iconId

        const oldCtg = await CategoryService.findCategoryById(id)


        if (oldCtg && oldCtg.title === title || oldCtg?.icon?.id === iconId) {
            return res.status(200).json({
                message: 'Siz hech qanday o\'zgarish kiritmadingiz'
            });
        }

        if (!oldCtg) {
            return res.status(404).json({
                message: `Category not found by id: ${id}`
            })
        }

        let updated = false;

        if (oldCtg.title !== title) {
            updated = true;
        }

        if (oldCtg.icon?.id !== iconId) {
            updated = true;
        }

        if (!updated) {
            return res.status(200).json({
                message: "Siz hech qanday o'zgarish kiritmadingiz",
            });
        }

        const newCtg = await CategoryService.updateCategoryById(id, title, iconId)


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