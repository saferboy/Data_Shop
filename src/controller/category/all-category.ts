import { Request, NextFunction, Response } from "express";
import CategoryService from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const allCtg = await CategoryService.findAllCategory(page, limit)

        const mapped = allCtg.map(fined => {
            return {
                id: fined.id,
                title: fined.title,
                icon: fined.file
            }
        })

        return res.status(201).json({
            message: 'Retrive all category',
            category: mapped
        })

    } catch (error) {
        next(error)
    }
}