import { Request, Response, NextFunction } from 'express';
import CommentService from '@service/comment.service';
import { CommentData } from '@model/comment.dto';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const item: CommentData = req.body

        const oldComment = await CommentService.findCommentById(id)

        if (!oldComment) {
            return res.status(404).json({
                message: `Comment not found By id: ${id}`
            });
        }

        const newComment = await CommentService.updateComment(id, item)

        return res.status(200).json({
            message: 'Comment updated',
            comment: {
                userId: newComment.userId,
                productId: newComment.productId,
                id:   newComment.id,
                comment: newComment.comment,
                rate: newComment.rate
            }
        });
    } catch (err) {
        next(err);
    }
};
