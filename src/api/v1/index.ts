import { Router } from "express";

// v1 imports
import category from './category'
import auth from './auth'
import userInfo from './manage-user'
import upload from './upload'

const router = Router()

    .use('/category', category)
    .use('/auth', auth)
    .use('/user', userInfo)
    .use('/upload', upload)

export default router