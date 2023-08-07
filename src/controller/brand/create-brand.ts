import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';
import FileService from '@service/file.service';
import CategoryService from '@service/category.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const categoryId = +req.body.categoryId
        const title = req.body.title
        const iconId = +req.body.iconId

        const foundCtg = await CategoryService.findCategoryById(categoryId)

        if (!foundCtg) {
            return res.status(400).json({
                message: 'Category not found'
            });
        }

        const foundLogo = await FileService.findFileById(iconId)

        if (!foundLogo) {
            return res.status(400).json({
                message: 'Logo not found'
            });
        }

        const oldBrand = await BrandService.findBrandByName(title)

        if (oldBrand) {
            return res.status(200).json({
                message: 'Brand alredy created'
            });
        }

        if (!oldBrand) {
            const newBrand = await BrandService.createBrand(title, iconId, categoryId)

            return res.status(201).json({
                message: 'Brand created',
                brand: {
                    id: newBrand.id,
                    title: newBrand.title,
                    logo: {
                        id: newBrand.icon?.id,
                        path: newBrand.icon?.path,
                        title: newBrand.icon?.filename
                    }
                }
            })
        }

    } catch (err) {
        next(err);
    }
};
