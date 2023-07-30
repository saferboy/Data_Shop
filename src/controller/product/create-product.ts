// import { Request, Response, NextFunction } from 'express'
// import ProductService from '@service/product.service'
// import CategoryService from '@service/category.service'
// import { ProductBody } from '@model/product.dto'


// export default async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const id = +req.params.id

//         const detail: ProductBody = req.body

//         const find = await CategoryService.findCategoryById(id)

//         if (!find) {
//             return res.status(404).json({
//                 message: `Category not found this id: ${id}`
//             })
//         }

//         if (!req.file) {
//             return res.status(400).json({
//                 message: 'File not upload'
//             })
//         }

//         const image = req.file.filename

//         const newProduct = await ProductService.CreateProduct(id, detail, image)

//         return res.status(201).json({
//             message: 'Product created',
//             product: {
//                 id: newProduct.id,
//                 name: newProduct.name,
//                 price: newProduct.price,
//                 image: newProduct.image,
//                 description: newProduct.description,
//             }
//         })

//     } catch (error) {
//         next(error)
//     }
// }