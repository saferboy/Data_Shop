import { Request, Response, NextFunction } from 'express';
import FavoriteService from '@service/favorite.service';
import ProductService from '@service/product.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const productId = +req.body.productId

        const userId = res.locals.payload.userId

        const foundProduct = await ProductService.findProductById(productId)

        if (!foundProduct) {
            return res.status(400).json({
                message: `Product not found by id: ${foundProduct}`
            });
        }

        const addFavorite = await FavoriteService.createFavorite(userId, productId)

        return res.status(200).json({
            message: 'the product has been added to favorites',
            favorite: {
                id: addFavorite.id,
                userId: addFavorite.User?.id,
                product: {
                    id: addFavorite.Product.id,
                    title: addFavorite.Product.title,
                    rating: addFavorite.Product.rating,
                    discount: addFavorite.Product.discount,
                    sellPrice: addFavorite.Product.sellPrice,
                    image: addFavorite.Product.file.map(item => ({
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
