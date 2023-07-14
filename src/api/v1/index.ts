import { Router } from "express";

// v1 imports
import category from './category'
import product from './product'

const router = Router()

    .use('/category', category)
    .use('/product', product)

export default router