import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const allProduct = await ProductService.allProducts(page, limit)

        const mapped = allProduct.map(item => {
            return {
                categoryId: item.categoryId,
                brandId: item.brandId,
                id: item.id,
                title: item.title,
                description: item.description,
                incomePrice: item.incomePrice,
                sellPrice: item.sellPrice,
                discount: item.discount,
                count: item.count,
                rating: item.rating,
                file: item.file.map((img) => {
                   return {
                    id: img.id,
                    path: img.path,
                    filename: img.filename
                   }
                })
            }
        })

        return res.status(200).json({
            message: 'Retrive all products',
            products: mapped
        });

    } catch (err) {
        next(err);
    }
};
