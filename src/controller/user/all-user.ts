import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const allUser = await AuthService.allUsers()

        const mapped = allUser.map(detail => {
            return {
                id: detail.id,
                name: detail.name,
                surname: detail.surname,
                phone: detail.phone,
                email: detail.email,
                address: detail.address,
                role: detail.role
            }
        })

        return res.status(200).json({
            message: 'Retrive all user',
            user: mapped
        })

    } catch (err) {
        next(err);
    }
};
