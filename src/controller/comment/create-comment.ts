import { Request, Response, NextFunction } from 'express';
import CommentService from '@service/comment.service';
import ProductService from '@service/product.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = res.locals.payload.userId
        
        const productId = +req.body.productId
        
        const comment = req.body.comment
        
        const rate = +req.body.rate        

        const foundProduct = await ProductService.findProductById(productId)

        if (!foundProduct) {
            return res.status(400).json({
                message: `Product not found by id: ${productId}`
            });
        }


        const newComment = await CommentService.createComment(userId, productId, comment, rate)
        
        console.log(newComment.userId);

        return res.status(200).json({
            message: 'Your comment is sending',
            comment: {
                user: {
                    id: newComment.user.id,
                    name: newComment.user.name 
                },
                id: newComment.id,
                comment: newComment.comment,
                rate: newComment.rate
            }
        });

    } catch (err) {
        next(err);
    }
};
