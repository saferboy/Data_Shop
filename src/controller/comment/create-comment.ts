import { Request, Response, NextFunction } from 'express';
import CommentService from '@service/comment.service';
import ProductService from '@service/product.service';
import { CommentData } from '@model/comment.dto';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = res.locals.userId

        const productId = +req.params.productId


        const foundProduct = await ProductService.findProductById(productId)

        if (!foundProduct) {
            return res.status(400).json({
                message: `Product not found by id: ${productId}`
            });
        }

        const item: CommentData = req.body

        const newComment = await CommentService.createComment(userId, item, productId)

        return res.status(200).json({
            message: 'Your comment is sending',
            comment: {
                id: newComment.id,
                comment: newComment.comment,
                rate: newComment.rate,
                userId: newComment.userId,
                productId: newComment.productId
            }
        });

    } catch (err) {
        next(err);
    }
};
