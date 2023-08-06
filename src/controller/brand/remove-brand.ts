import { Request, Response, NextFunction } from 'express';
import BrandService from '@service/brand.service';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const thisBrand = await BrandService.findBrandById(id)

        if(!thisBrand) {
            return res.status(404).json({
                message: 'Brand not found or alredy deleted'
            });
        };

        const removedBrnd = await BrandService.deleteBrand(id)

        if (removedBrnd.logo) {
            await FileService.deleteFile(removedBrnd.logo.id)
        }

        return res.status(200).json({
            message: 'Brand deleted',
            brand: {
                id: removedBrnd.id,
                title: removedBrnd.title,
                logo: {
                    id: removedBrnd.logo?.id,
                    path: removedBrnd.logo?.path,
                    filename: removedBrnd.logo?.filename
                }
            }
        });

    } catch (err) {
        next(err);
    }
};
