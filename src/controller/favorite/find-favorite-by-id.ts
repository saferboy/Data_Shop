import { Request, Response, NextFunction } from 'express';
import FavoriteService from '@service/favorite.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const foundWishes = await FavoriteService.findFavorite(id)

        if (!foundWishes) {
            return res.status(400).json({
                message: `No favorites found for this ${id}`
            });
        }

        return res.status(200).json({
            message: 'Your favorite product',
            favorite: {
                id: foundWishes.id,
                userId: foundWishes.User?.id,
                product: {
                    id: foundWishes.Product.id,
                    title: foundWishes.Product.title,
                    rating: foundWishes.Product.rating,
                    discount: foundWishes.Product.discount,
                    sellPrice: foundWishes.Product.sellPrice,
                    image: foundWishes.Product.file.map(item => ({
                        id: item.id,
                        path: item.path,
                        filename: item.filename
                    })),
                }
            }
        });

    } catch (err) {
        next(err);
    }
};
