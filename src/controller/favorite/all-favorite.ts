import { Request, Response, NextFunction } from 'express';
import FavoriteService from '@service/favorite.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const allWishes = await FavoriteService.allFavorite(page, limit)

        return res.status(200).json({
            message: 'All favorite products',
            favorite: allWishes.map(item => ({
                id: item.id,
                product: {
                    id: item.Product.id,
                    title: item.Product.title,
                    rating: item.Product.rating,
                    discount: item.Product.discount,
                    sellPrice: item.Product.sellPrice,
                    image: item.Product.file.map(img => ({
                        id: img.id,
                        path: img.path,
                        filename: img.filename
                    }))
                }
            }))
        });

    } catch (err) {
        next(err);
    }
};
