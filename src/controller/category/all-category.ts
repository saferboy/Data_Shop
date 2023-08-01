import { Request, NextFunction, Response } from "express";
import CategoryService from "@service/category.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const allCtg = await CategoryService.findAllCategory()

        const mapped = allCtg.map(fined => {
            return {
                id: fined.id,
                title: fined.title,
                icon: fined.icon,
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