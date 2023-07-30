import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const find = await ProductService.findProductById(id)

        if (!find) {
            return res.status(401).json({
                message: `Product not found this id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Retrive product`,
            product: {
                id: find.id,
                name: find.name,
                price: find.price,
                image: find.image,
                description: find.description,
                details: find.details,
                reviews: find.reviews
            }
        });

    } catch (err) {
        next(err);
    }
};
