import { Request, Response, NextFunction } from 'express';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const allFile = await FileService.allFile()

        const mapped = allFile.map(file => {
            return {
                id: file.id,
                path: file.path,
                filename: file.filename
            }
        })

        return res.status(200).json({
            message: 'Retrive all files',
            files: mapped
        });

    } catch (err) {
        next(err);
    }
};
