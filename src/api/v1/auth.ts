import { Router } from "express";
import { createValidator } from "express-joi-validation"

import register from "@controller/auth/register";
import verify from "@controller/auth/verify";
import login from "@controller/auth/login";
import resendCode from "@controller/auth/resendCode";

import { AuthSchemas } from "@utils/joi.schema";

const validator = createValidator()

const router = Router()

    .post('/register', validator.body(AuthSchemas.register), register)
    .post('/verify', validator.body(AuthSchemas.verify), verify)
    .post('/login', validator.body(AuthSchemas.login), login)
    .post('/resend', validator.body(AuthSchemas.resend), resendCode)

export default router