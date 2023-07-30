import { Router } from "express";

// v1 imports
import category from './category'
import product from './product'
import auth from './auth'
import userInfo from './manage-user'
import upload from './upload'

const router = Router()

    .use('/category', category)
    .use('/product', product)
    .use('/auth', auth)
    .use('/user', userInfo)
    .use('/uploader', upload)

export default router