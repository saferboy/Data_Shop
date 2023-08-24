import { Request, Response, NextFunction } from 'express';
import SchemaService from '@service/schema.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const oldSchema = await SchemaService.findById(id)

        if (!oldSchema) {
            return res.status(404).json({
                message: `Schema not found by id: ${id}`
            });
        }

        const removedS = await SchemaService.deleteSchemaById(id)

        return res.status(200).json({
            message: 'Schema deleted',
            schema: {
                id: removedS.id,
                title: removedS.title,
                keys: removedS.keys.map(item => ({
                    id: item.id,
                    key: item.key,
                    type: item.type
                }))
            }
        });

    } catch (err) {
        next(err);
    }
};
