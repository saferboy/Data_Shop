import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY, VERIFICATION_TIMEOUT } from "@config/verification";
import { VerificationDto } from "@model/verification.dto";
import AuthService from '@service/user.service';
import VerificationService from '@service/verification.service';
import { getTimeOut } from "@utils/generateCode";
import { Payload } from '@model/payload.dto';
import { sign } from '@service/jwt.service'
// import bcrypt from 'bcrypt'


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const verify: VerificationDto = req.body
        const verified = await VerificationService.findVerificationById(verify.verificationId)

        if (verified == null) {
            return res.status(400).json({
                message: `verification id: ${verify.verificationId} not found`
            })
        }

        const timeOut = getTimeOut(verified.createdAt, VERIFICATION_TIMEOUT)

        if (timeOut < 0) {
            return res.status(400).json({
                message: 'Verification code is expired, please resend code'
            })
        }

        if (verified.code != verify.code) {
            return res.status(400).json({
                message: 'Wrong verification code'
            })
        }

        const user = await AuthService.findUserByEmail(verified.email)

        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const payload: Payload = {
            userId: user.id,
            // email: user.email,
            // address: user.address
        }

        console.log(payload);

        const token = await sign(payload)

        const updateUser = await AuthService.changeUserRole(user.id, 'user')

        return res.status(201).json({
            message: 'Succesfully registered',
            user: {
                id: user.id,
                name: updateUser.name,
                surname: updateUser.surname,
                phone: updateUser.phone,
                email: updateUser.email,
                address: updateUser.address,
                role: updateUser.role
            },
            token: token
        })

        // second variant
        // return res.status(201).json({
        //     message: 'Succesfully registered',
        //     user: {
        //         id: payload.userId,
        //         name: updateUser.name,
        //         surname: updateUser.surname,
        //         phone: updateUser.phone,
        //         email: payload.email,
        //         address: payload.address,
        //         role: updateUser.role
        //     },
        //     token: token
        // })

    } catch (err) {
        next(err);
    }
};
