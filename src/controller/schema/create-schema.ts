import { Request, Response, NextFunction } from 'express';
import SchemaService from '@service/schema.service';
import { SchemaData } from '@model/schema.dto';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const schema: SchemaData = req.body

        const newSchema = await SchemaService.createSchema(schema)

        return res.status(201).json({
            message: 'Schema created',
            schema: {
                id: newSchema.id,
                title: newSchema.title,
                keys: newSchema.keys.map(key => ({
                    id: key.id,
                    key: key.key,
                    type: key.type
                }))
            }
        });

    } catch (err) {
        next(err);
    }
};
