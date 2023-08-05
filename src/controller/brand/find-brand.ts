import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const brandId = +req.params.id

        const foundBrand = await BrandService.findBrandById(brandId)

        if (!foundBrand) {
            return res.status(404).json({
                message: 'Brand not found'
            });
        }

        return res.status(200).json({
            message: 'Retrive Brand',
            brand: {
                id: foundBrand.id,
                title: foundBrand.title,
                logo: {
                    id: foundBrand.logo?.id,
                    path: foundBrand.logo?.path,
                    filename: foundBrand.logo?.filename
                }
            }
        });

    } catch (err) {
        next(err);
    }
};
