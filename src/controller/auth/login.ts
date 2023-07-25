import { Request, Response, NextFunction } from 'express';
import AuthService from '@service/user.service';
import { LoginDto } from '@model/login.dto';
import { Payload } from '@model/payload.dto';
import { sign } from '@service/jwt.service';
import bcrypt from 'bcrypt'


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const login: LoginDto = req.body

        const user = await AuthService.findUserByEmail(login.email)

        if (!user) {
            return res.status(404).json({
                message: `User with email ${login.email} not found`
            })
        }

        if (user.role == 'none') {
            return res.status(400).json({
                message: 'Account not verified, please verify account'
            })
        }

        const isPasswordValid = bcrypt.compareSync(login.password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        const payload: Payload = {
            userId: user.id,
            // email: user.email,
            // address: user.address,
        };

        const token = await sign(payload);

        return res.status(201).json({
            message: 'Successfully login',
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                email: user.email,
                address: user.address,
                role: user.role 
            },
            token: token,
        });


    } catch (err) {
        next(err);
    }
};
