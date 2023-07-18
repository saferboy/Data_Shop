import { Router } from "express";

// v1 imports
import category from './category'
import product from './product'
import auth from './auth'

const router = Router()

    .use('/category', category)
    .use('/product', product)
    .use('/auth', auth)

export default router