import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';
import FileService from '@service/file.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const brandId = +req.params.id
        const title = req.body.title
        const logoId = +req.body.logoId

        const foundBrand = await BrandService.findBrandById(brandId)

        if (!foundBrand) {
            return res.status(404).json({
                message: `Brand not found this id: ${brandId}`
            });
        }

        const foundLogo = await FileService.findFileById(logoId)

        if (!foundLogo) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        const oldBrand = await BrandService.findBrandByName(title)

        if (oldBrand && (oldBrand.title === title && oldBrand.logo?.id === logoId)) {
            return res.status(304).end();
        }
        
        const newBrand = await BrandService.updateBrandById(brandId, title, logoId)

        return res.status(200).json({
            message: 'Brand updated',
            id: newBrand.id,
            title: newBrand.title,
            logo: {
                id: newBrand.logo?.id,
                path: newBrand.logo?.path,
                filename: newBrand.logo?.filename
            }
        })



    } catch (err) {
        next(err);
    }
};
