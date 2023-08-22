import { Router } from "express";

// v1 imports
import auth from './auth'
import userInfo from './manage-user'
import category from './category'
import brand from './brand'
import product from './product'
import upload from './upload'
import comment from './comment'
import schema from './schema'

const router = Router()

    .use('/auth', auth)
    .use('/user', userInfo)
    .use('/category', category)
    .use('/brand', brand)
    .use('/product', product)
    .use('/upload', upload)
    .use('/comment', comment)
    .use('/schema', schema)

export default router