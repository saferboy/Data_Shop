import { Request, Response, NextFunction } from 'express';
import CommentService from '@service/comment.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const findComment = await CommentService.findCommentById(id) 

        if (!findComment) {
            return res.status(404).json({
                message: `Comment not found by id: ${id} or alredy deleted`
            });
        }

        const removedComment = await CommentService.removeComment(id)

        return res.status(200).json({
            message: 'Comment removed',
            comment: {
                userId: removedComment.userId,
                productId: removedComment.productId,
                id: removedComment.id,
                comment: removedComment.comment,
                rate: removedComment.rate
            }
        });

    } catch (err) {
        next(err);
    }
};
