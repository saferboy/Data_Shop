import { Request, Response, NextFunction } from 'express';
import CommentService from '@service/comment.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page = req.query.page ? +req.query.page : undefined
        const limit = req.query.limit ? +req.query.limit : undefined

        const comments = await CommentService.allComments(page, limit)

        const format = comments.map(item => ({
            userId: item.userId,
            productId: item.productId,
            id: item.id,
            comment: item.comment,
            rate: item.rate
        }))

        return res.status(200).json({
            message: 'Retrive all comments',
            comments: format
        });

    } catch (err) {
        next(err);
    }
};
