import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const foundUser = await AuthService.findUserById(id)

        if (!foundUser) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        return res.status(200).json({
            message: 'Retrive user',
            user: {
                id: foundUser.id,
                name: foundUser.name,
                surname: foundUser.surname,
                phone: foundUser.phone,
                email: foundUser.email,
                address: foundUser.address,
                role: foundUser.role
            }
        })

    } catch (err) {
        next(err);
    }
};
