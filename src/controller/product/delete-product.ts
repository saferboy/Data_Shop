import { Request, Response, NextFunction } from 'express';
import ProductService from '@service/product.service';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const oldP = await ProductService.findProductById(id)

        if (!oldP) {
            return res.status(400).json({
                message: `Product not found by id: ${id} or alredy deleted`
            })
        }

        // if (oldP.file && oldP.file.length > 0) {
        //     // Fayllarni o'chirish
        //     const fileIds: number[] = oldP.file.map((file) => file.id);
        //     await FileService.deleteFile(fileIds);
        // }

    } catch (err) {
        next(err);
    }
};
