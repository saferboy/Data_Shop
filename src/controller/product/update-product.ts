import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';
import { ProductData } from '@model/product.dto';

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = +req.params.id;
        const item: ProductData = req.body;
        const file: number[] = req.body.file

        if (!item || Object.keys(item).length === 0) {
            return res.status(400).json({
                message: 'No product data provided in the request body'
            });
        }

        const oldProduct = await ProductService.findProductById(id);

        if (!oldProduct) {
            return res.status(404).json({
                message: `Product not found by id: ${id}`
            });
        }

        const result = await ProductService.UpdateProduct(
            id,
            item,
            file
        )

        if (
            result.title === oldProduct.title &&
            result.description === oldProduct.description &&
            result.incomePrice === oldProduct.incomePrice &&
            result.sellPrice === oldProduct.sellPrice &&
            result.discount === oldProduct.discount &&
            result.count === oldProduct.count &&
            JSON.stringify(result.file) === JSON.stringify(oldProduct.file)
        ) {
            return res.status(200).json({
                message: 'No changes detected in the product data',
                product: {
                    categoryId: result.categoryId,
                    brandId: result.brandId,
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    incomePrice: result.incomePrice,
                    sellPrice: result.sellPrice,
                    discount: result.discount,
                    count: result.count,
                    file: result.file,
                }
            })
        }

        return res.status(200).json({
            message: 'Product updated',
            product: {
                categoryId: result.categoryId,
                brandId: result.brandId,
                id: result.id,
                title: result.title,
                description: result.description,
                incomePrice: result.incomePrice,
                sellPrice: result.sellPrice,
                discount: result.discount,
                count: result.count,
                file: result.file
            }
        })

    } catch (err) {
        next(err)
    }
}




