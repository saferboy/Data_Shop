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

        if (removedBrnd.icon) {
            await FileService.deleteFile(removedBrnd.icon.id)
        }

        return res.status(200).json({
            message: 'Brand deleted',
            brand: {
                id: removedBrnd.id,
                title: removedBrnd.title,
                logo: {
                    id: removedBrnd.icon?.id,
                    path: removedBrnd.icon?.path,
                    filename: removedBrnd.icon?.filename
                }
            }
        });

    } catch (err) {
        next(err);
    }
};
