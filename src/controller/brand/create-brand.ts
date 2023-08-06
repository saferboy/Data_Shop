import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';
import FileService from '@service/file.service';
import CategoryService from '@service/category.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const categoryId = +req.params.id
        const title = req.body.title
        const logoId = +req.body.logoId

        const foundCtg = await CategoryService.findCategoryById(categoryId)

        if (!foundCtg) {
            return res.status(400).json({
                message: 'Category not found'
            });
        }

        const foundLogo = await FileService.findFileById(logoId)

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

        const newBrand = await BrandService.createBrand(title, logoId, categoryId)

        return res.status(201).json({
            message: 'Brand created',
            brand: {
                id: newBrand.id,
                title: newBrand.title,
                logo: {
                    id: newBrand.logo?.id,
                    path: newBrand.logo?.path,
                    title: newBrand.logo?.filename
                }
            }
        })

    } catch (err) {
        next(err);
    }
};
