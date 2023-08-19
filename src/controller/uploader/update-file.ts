import { Request, Response, NextFunction } from 'express';
import FileService from '@service/file.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const files = req.files
        const fileId = +req.params.id

        if (!files) {
            return res.status(400).json({
                message: "File not uploaded"
            })
        }

        if (Array.isArray(files)) {

            const dtos = files.map(file => ({
                path: file.filename,
                filename: file.originalname
            }))

            const result = await FileService.updateFile(fileId, dtos)

            
            return res.status(201).json({
                message: "New file uploaded",
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
