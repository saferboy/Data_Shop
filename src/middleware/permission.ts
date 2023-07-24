import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';
import { verify } from '@service/jwt.service';
import { role } from '@prisma/client';



export const  permission = (role: role) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.header('authorization')

        if (!token) {
            return res.status(404).json({
                message: 'Token not provided'
            })
        }

        try {

            let payload = await verify(token)
            console.log(payload);

            const user = await AuthService.findUserById(payload.userId)

            if (role) {
                if (user?.role != role) {
                    return res.status(403).json({
                        message: "Access denied this organization"
                    })
                }
            }

            // if (user?.role !== role) {
            //     return res.status(403).json({
            //         message: 'Access denied this organization',
            //     });
            // }

            res.locals.payload = payload
            next()

        } catch (error) {
            next(error)
        }

    }
}