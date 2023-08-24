import { Request, Response, NextFunction } from 'express';
import SchemaService from '@service/schema.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

    const id = +req.params.id
    
    const oldSchema = await SchemaService.findById(id)

        if(!oldSchema) {
            return res.status(400).json({
                message: `Schema not found by id: ${id}`
            })
        }

        return res.status(200).json({
            message: `Retrive schema by id: ${id}`,
            schema: {
                id: oldSchema.id,
                title: oldSchema.title,
                keys: oldSchema.keys.map(key => ({
                    id: key.id,
                    key: key.key, 
                    type: key.type
                }))
            }
        })

    } catch (err) {
        next(err);
    }
};
