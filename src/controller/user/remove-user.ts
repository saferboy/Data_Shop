import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const oldUser = await AuthService.findUserById(id)

        if (!oldUser) {
            return res.status(404).json({
                message: 'User not found or alredy deleted'
            })
        }

        const deletedUser = await AuthService.removeUser(id)

        return res.status(200).json({
            message: 'User removed',
            user: {
                id: deletedUser.id,
                name: deletedUser.name,
                surname: deletedUser.surname,
                phone: deletedUser.phone,
                email: deletedUser.email,
                address: deletedUser.address,
                password: deletedUser.password,
                role: deletedUser.role
            }
        })

    } catch (err) {
        next(err);
    }
};
