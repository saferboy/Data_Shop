import { Request, Response, NextFunction, query } from 'express';
import AuthService from '@service/user.service';
import { role } from '@prisma/client';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const role = req.query.role as role

        const foundAdmin = await AuthService.findAdmins(role)

        const mapped = foundAdmin.map(admins => {
            return {
                id: admins.id,
                name: admins.name,
                surname: admins.surname,
                phone: admins.phone,
                email: admins.email,
                address: admins.address,
                role: admins.role
            }
        })

        return res.status(200).json({
            message: 'Retrive all admins',
            admins: mapped
        })

    } catch (err) {
        next(err);
    }
};
