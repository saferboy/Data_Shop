import { Request, Response, NextFunction } from "express";
import ProductService from "@service/product.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const details = await ProductService.AllProducts()

        const mapped = details.map(detail => {
            return {
                id: detail.id,
                name: detail.name,
                price: detail.price,
                image: detail.image,
                description: detail.description,
                detail: detail.details,
                reviews: detail.reviews
            }
        })

        return res.status(201).json({
            message: 'Retrive all products',
            product: mapped
        })

    } catch (error) {
        next(error)
    }
}