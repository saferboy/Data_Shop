import { Request, Response, NextFunction } from 'express';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const file = await FileService.findFileById(id)

        if(!file) {
            return res.status(200).json({
                message: 'File not found or not uploaded',

            });
        }

        return res.status(200).json({
            message: `Retrive file by id: ${file.id}`,
            file: {
                id: file.id,
                path: file.path,
                filename: file.filename
            }
        });

    } catch (err) {
        next(err);
    }
};
