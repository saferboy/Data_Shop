import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';
import { ProductData } from '@model/product.dto';
import CategoryService from '@service/category.service';
import BrandService from '@service/brand.service';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    const item: ProductData = req.body

    const image: number[] = req.body.image
    
    const brandId = +req.body.brandId

    const foundBrand = await BrandService.findBrandById(brandId)

    if (!foundBrand) {
      return res.status(400).json({
        message: `Brand not found by id: ${foundBrand}`
      });
    }

    const categoryId = +req.body.categoryId

    const foundCtg = await CategoryService.findCategoryById(categoryId)

    if(!foundCtg) {
      return res.status(400).json({
        message: `Category not found by id: ${foundCtg}`
      });
    }

    const result = await ProductService.CreateProduct(item, brandId, image, categoryId)

    return res.status(201).json({
      message: 'Product created',
      product: {
        categoryId: result.categoryId,
        brandId: result.brandId,
        id: result.id,
        title: result.title,
        description: result.description,
        incomePrice:  result.incomePrice,
        sellPrice: result.sellPrice,
        discount: result.discount,
        count: result.count,
        image: result.image
      }
    });

  } catch (err) {
    next(err);
  }
};
