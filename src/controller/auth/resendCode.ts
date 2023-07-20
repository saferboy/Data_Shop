import { Request, Response, NextFunction } from 'express';
import { generateCode, getTimeOut } from '@utils/generateCode';
import VerificationService from '@service/verification.service';
import AuthService from '@service/user.service';
import { VERIFICATION_TIMEOUT } from '@config/verification';
import { ResendDto } from '@model/resend.dto';
import { sendEmail } from '@service/mail.service';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const resend: ResendDto = req.body

        const user = await AuthService.findUserByEmail(resend.email)

        if (user == null) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const code: string = generateCode()

        const verification = await VerificationService.createVerification(code, user.email)

        if (verification == null) {
            return res.status(400).json({
                message: 'Cannot save verification'
            })
        }

        await sendEmail(user.email, code)

        return res.status(200).json({
            message: 'Verification code sended to email',
            email: user.email,
            verificationId: verification.id,
            timeOut: getTimeOut(verification.createdAt, VERIFICATION_TIMEOUT)
        })

    } catch (err) {
        next(err);
    }
};


