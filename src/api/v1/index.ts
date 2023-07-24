import { Router } from "express";

// v1 imports
import category from './category'
import product from './product'
import auth from './auth'
import userInfo from './userInfo'

const router = Router()

    .use('/category', category)
    .use('/product', product)
    .use('/auth', auth)
    .use('/user', userInfo)

export default router