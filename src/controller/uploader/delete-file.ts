import { Request, Response, NextFunction } from 'express';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const findFile = await FileService.findFileById(id)

        if (!findFile) {
            return res.status(400).json({
                message: 'File not found or alredy deleted'
            });
        }

        const removed = await FileService.deleteFile(id)

        return res.status(200).json({
            message: `File removed by id: ${removed.id}`,
            icon: {
                id: removed.id,
                path: removed.path,
                filename: removed.filename
            }
        })

    } catch (err) {
        next(err);
    }
};
