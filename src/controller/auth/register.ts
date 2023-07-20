import { Request, Response, NextFunction } from 'express';
import { generateCode, getTimeOut } from '@utils/generateCode'
import { Userbody } from '@model/user.dto';
import { VERIFICATION_TIMEOUT } from '@config/verification';
import VerificationService from '@service/verification.service';
import AuthService from '@service/user.service';
import { sendEmail } from '@service/mail.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data: Userbody = req.body

        const isExcist: boolean = await AuthService.excistUser(data.email)

        if (isExcist) {
            return res.status(403).json({
                message: 'Email alredy busy'
            })
        }

        const newUser = await AuthService.createUser(data)

        const code: string = generateCode()

        await sendEmail(newUser.email, code)

        const verification = await VerificationService.createVerification(code, newUser.email)

        if (verification == null) {
            return res.status(500).json({
                message: "Can't save verification"
            })
        }

        const deleteCount = await VerificationService.cleanVerification(VERIFICATION_TIMEOUT)
        console.log('Deleted verification', deleteCount);

        return res.status(200).json({
            message: 'Verification code sended to email',
            email: newUser.email,
            verificationId: verification.id,
            timeOut: getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)
        })

    } catch (err) {
        next(err);
    }
};
