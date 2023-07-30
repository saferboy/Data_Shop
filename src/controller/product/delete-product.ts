import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = +req.params.id

    const oldProduct = await ProductService.findProductById(id)

    if (!oldProduct) {
        return res.status(401).json({
            message: 'Product not found or alredy deleted'
        });
    }

    const removed = await ProductService.deleteProduct(id) 

    return res.status(200).json({
        message: 'Product deleteed',
        product: {
            id: removed.id,
            name: removed.name,
            price: removed.price,
            description: removed.description,
            image: removed.image
        }
    });

  } catch (err) {
    next(err);
  }
};
