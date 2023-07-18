import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY, VERIFICATION_TIMEOUT } from "@config/verification";
import { VerificationDto } from "@model/verification.dto";
import AuthService from '@service/user.service';
import VerificationService from '@service/verification.service';
import { getTimeOut } from "@utils/generateCode";



export default async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
};
