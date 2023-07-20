import { Router } from "express";

import register from "@controller/auth/register";
import verify from "@controller/auth/verify";
import login from "@controller/auth/login";
import resendCode from "@controller/auth/resendCode";

const router = Router()

    .post('/register', register)
    .post('/verify', verify)
    .post('/login', login)
    .post('/resend', resendCode)

export default router