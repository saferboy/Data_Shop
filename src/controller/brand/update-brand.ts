import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';
import FileService from '@service/file.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const brandId = +req.params.id
        const title = req.body.title
        const fileId = +req.body.fileId

        const foundBrand = await BrandService.findBrandById(brandId)

        if (!foundBrand) {
            return res.status(404).json({
                message: `Brand not found this id: ${brandId}`
            });
        }

        const foundFile = await FileService.findFileById(fileId)

        if (!foundFile) {
            return res.status(404).json({
                message: 'File not found'
            });
        }

        const oldBrand = await BrandService.findBrandByName(title)

        if (oldBrand && oldBrand.id === brandId && oldBrand.file?.id === fileId) {
            return res.status(200).json({
                message: 'No changes were made',
                id: oldBrand.id,
                title: oldBrand.title,
                file: oldBrand.file
            });
        }

        const newBrand = await BrandService.updateBrandById(brandId, title, fileId)

        return res.status(200).json({
            message: 'Brand updated',
            id: newBrand.id,
            title: newBrand.title,
            file: newBrand.file
        })



    } catch (err) {
        next(err);
    }
};
