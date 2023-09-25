import { Request, Response, NextFunction } from 'express';
import FavoriteService from '@service/favorite.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const oldWishes = await FavoriteService.findFavorite(id)

        if (!oldWishes?.id) {
            return res.status(404).json({
                message: 'Favoite product not found'
            });
        }

        const remove = await FavoriteService.removeFavorite(id)

        return res.status(200).json({
            message: 'The product has been removed from the favorites list',
            favorite: {
                id: remove.id,
                userId: remove.Product.id,
                product: {
                    id: remove.Product.id,
                    title: remove.Product.title,
                    rating: remove.Product.rating,
                    discount: remove.Product.discount,
                    sellPrice: remove.Product.sellPrice,
                    image: remove.Product.file.map(item => ({
                        id: item.id,
                        path: item.path,
                        filename: item.filename
                    }))
                }
            }
        });

    } catch (err) {
        next(err);
    }
};
