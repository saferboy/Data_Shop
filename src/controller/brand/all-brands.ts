import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const brands = await BrandService.allBrands(page, limit)

        const mapped = brands.map(brand => {
            return {
                id: brand.id,
                title: brand.title,
                file: brand.file
            }
        })

        return res.status(200).json({
            message: 'Retrive all brands',
            brands: mapped
        });

    } catch (err) {
        next(err);
    }
};
