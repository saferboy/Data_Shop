import { Router } from "express";

// v1 imports
import category from './category'

const router = Router()

    .use('/category', category)

export default router