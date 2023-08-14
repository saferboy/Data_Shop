import { Request, Response, NextFunction } from 'express';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const allFile = await FileService.allFile(page, limit)

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
