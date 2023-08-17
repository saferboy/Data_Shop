import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const foundP = await ProductService.findProductById(id)

        if(!foundP) {
            return res.status(400).json({
                message: `Product not found by id: ${foundP}`
            });
        }

        return res.status(200).json({
            message: `Retrive product by id: ${foundP.id}`,
            product: {
                categoryId: foundP.categoryId,
                brandId: foundP.brandId,
                id: foundP.id,
                title: foundP.title,
                description: foundP.description,
                incomePrice: foundP.incomePrice,
                sellPrice: foundP.sellPrice,
                discount: foundP.discount,
                count: foundP.count,
                rating: foundP.rating,
                image: foundP.image.map(img => {
                    return {
                        id: img.id,
                        path: img.path,
                        filename: img.filename
                    }
                })
            }
        });

    } catch (err) {
        next(err);
    }
};
