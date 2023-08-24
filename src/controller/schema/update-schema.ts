// import { Request, Response, NextFunction } from 'express';
// import SchemaService from '@service/schema.service';
// import { SchemaData } from '@model/schema.dto';

// export default async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const schemaId = +req.params.schemaId
        
//         const updateData: SchemaData = req.body

//         const foundS = await SchemaService.findById(schemaId)

//         if (!foundS) {
//             return res.status(404).json({
//                 message: `No schema found with this id: ${schemaId}`
//             });
//         }

//         const newSchema = await SchemaService.updateSchema(schemaId, updateData)

//         return res.status(200).json({
//             message: 'Schema updated',
//             schema: {
//                 id: newSchema.id,
//                 title: newSchema.title,
//                 keys: newSchema.keys.map(key => ({
//                     id: key.id,
//                     key: key.key,
//                     type: key.type
//                 }))
//             }
//         });

//     } catch (err) {
//         next(err);
//     }
// };
