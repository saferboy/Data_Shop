import { Request, Response, NextFunction } from 'express';
import SchemaService from "@service/schema.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const schema = await SchemaService.findAllSchema(page, limit)

        return res.status(200).json({
            message: 'Retrive all schema',
            schema: schema.map(schema => ({
                id: schema.id,
                title: schema.title,
                // keys: schema.keys.map(key => ({
                //     id: key.id,
                //     key: key.key,
                //     type: key.type
                // }))
            }))
        });

    } catch (err) {
        next(err);
    }
};
