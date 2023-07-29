import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';
import { verify } from '@service/jwt.service';
import { role } from '@prisma/client';

export const permission = (permissions: role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('authorization');

        if (!token) {
            return res.status(401).json({
                message: 'Token not provided'
            });
        }

        try {
            const payload = await verify(token);
            console.log(payload);

            const user = await AuthService.findUserById(payload.userId);

            if (user?.role && permissions.length > 0 && !permissions.includes(user.role)) {
                return res.status(403).json({
                    message: 'Access denied this organization'
                });
            }

            res.locals.payload = payload;
            next();
        } catch (error) {
            next(error);
        }
    };
};
