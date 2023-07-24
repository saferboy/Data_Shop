import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';
import { role } from '@prisma/client';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const role = req.body.role

        const oldUser = await AuthService.findUserById(id)

        if (!oldUser) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        const newUserRole = await AuthService.changeUserRole(id, role)

        return res.status(200).json({
            message: "User's role has changed",
            user: {
                id: newUserRole.id,
                name: newUserRole.name,
                role: newUserRole.role
            }
        })

    } catch (err) {
        next(err);
    }
};
