import { Router } from "express";

import register from "@controller/auth/register";
import login from "@controller/auth/login";

const router = Router()

    .post('/register', register)
    .post('/login', login)

export default router