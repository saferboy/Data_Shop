import { Router } from "express";

// v1 imports
import auth from './auth'
import userInfo from './manage-user'
import category from './category'
import brand from './brand'
import upload from './upload'
import comment from './comment'

const router = Router()

    .use('/category', category)
    .use('/brand', brand)
    .use('/auth', auth)
    .use('/user', userInfo)
    .use('/upload', upload)
    .use('/comment', comment)

export default router