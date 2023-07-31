import { Request, Response, NextFunction } from 'express';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const files = req.files
        const iconId = +req.params.iconId

        if (!files) {
            return res.status(400).json({
                message: "Files not uploaded"
            })
        }

        if (Array.isArray(files)) {

            const dtos = files.map(file => ({
                path: file.filename,
                filename: file.originalname
            }))

            const result = await FileService.updateFile(iconId, dtos)

            return res.status(201).json({
                message: "Files uploaded",
                data: result
            })
        }
        else {
            return res.status(400).json({
                message: "Files must be from one field"
            })
        }

    } catch (err) {
        next(err);
    }
};
