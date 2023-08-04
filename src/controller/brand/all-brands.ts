import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const brands = await BrandService.allBrands()

        const mapped = brands.map(brand => {
            return {
                id: brand.id,
                title: brand.title,
                logo: {
                    id: brand.logo?.id,
                    path: brand.logo?.path,
                    filename: brand.logo?.filename
                }
            }
        })

        return res.status(200).json({
            message: 'Retrive all brands',
            brand: mapped
        });

    } catch (err) {
        next(err);
    }
};
