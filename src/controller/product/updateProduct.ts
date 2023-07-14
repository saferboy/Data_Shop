import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';
import { ProductBody } from '@model/product.dto';


export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = +req.params.id

    const detail: ProductBody = req.body

    const find = await ProductService.findProductById(id)

    if (!find) {
      return res.status(401).json({
        message: 'Product not found'
      });
    }

    if (!req.file) {
      return res.status(401).json({
        message: 'File not upload'
      });
    }

    const newImg = req.file.filename

    const updatedProduct = await ProductService.updateProduct(id, detail, newImg)

    return res.status(200).json({
      message: 'Product updated',
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        image: updatedProduct.image,
        description: updatedProduct.description
      }
    });

  } catch (err) {
    next(err);
  }
};

