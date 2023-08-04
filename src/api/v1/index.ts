import { Router } from "express";

// v1 imports
import category from './category'
import brand from './brand'
import auth from './auth'
import userInfo from './manage-user'
import upload from './upload'

const router = Router()

    .use('/category', category)
    .use('/brand', brand)
    .use('/auth', auth)
    .use('/user', userInfo)
    .use('/upload', upload)

export default router