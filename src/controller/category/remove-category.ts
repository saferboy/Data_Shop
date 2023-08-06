import { Request, Response, NextFunction } from "express";
import CategoryService from "@service/category.service";
import FileService from "@service/file.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const oldCtg = await CategoryService.findCategoryById(id)

        if (!oldCtg) {
            return res.status(404).json({
                message: 'Category not found or alredy deleted'
            })
        }

        
        const removedCtg = await CategoryService.deleteCategory(id)
        
        if (removedCtg.icon) {
            await FileService.deleteFile(removedCtg.icon.id)
        }

        return res.status(200).json({
            message: `Category deleted by id: ${id}`,
            category: {
                id: removedCtg.id,
                title: removedCtg.title,
                icon: {
                    id: removedCtg.icon?.id,
                    path: removedCtg.icon?.path,
                    filename: removedCtg.icon?.filename
                }
            }
        })

    } catch (error) {
        next(error)
    }
}