import { Request, Response, NextFunction } from 'express';
import CommentService from '@service/comment.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const comment = await CommentService.findCommentById(id)

        if (!comment) {
            return res.status(400).json({
                message: `Comment not found by id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Retrive comment by id: ${comment.id}`,
            comment: {
                userId: comment.userId,
                productId: comment.productId,
                id: comment.id,
                comment: comment.comment,
                rate: comment.rate
            }
        });

    } catch (err) {
        next(err);
    }
};
