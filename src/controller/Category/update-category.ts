import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id
        const name = req.body.name

        if (!req.file) {
            return res.status(404).json({
                message: 'File not upload'
            })
        }

        const icon = req.file.filename

        const oldCtg = await CategoryService.findCategoryById(id)

        if (!oldCtg) {
            return res.status(404).json({
                message: `Category not found by id: ${id}`
            })
        }

        const newCtg = await CategoryService.updateCategoryById(id, name, icon)

        if (name === oldCtg.name) {
            res.setHeader('Content-type', 'application/json');
            return res.status(304).send(JSON.stringify({
                message: 'You have not made any changes'
            }))
        }

        if (oldCtg.name == newCtg.name) {
            return res.status(200).json({
                message: 'Siz hech qanday o\'zgarish kiritmadingiz'
            });
        }


        return res.status(201).json({
            message: 'Category updated',
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