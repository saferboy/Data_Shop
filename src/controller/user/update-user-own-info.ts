import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';
import { Userbody } from '@model/user.dto';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const detail: Userbody = req.body

        const user = await AuthService.findUserById(id)

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        const newInfo = await AuthService.updateUserInfo(id, detail)

        return res.status(200).json({
            message: "Update user info",
            user: {
                id: newInfo.id,
                name: newInfo.name,
                surname: newInfo.surname,
                phone: newInfo.phone,
                email: newInfo.email,
                address: newInfo.address,
                password: newInfo.password
            }
        })




    } catch (err) {
        next(err);
    }
};
