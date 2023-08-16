import { Router } from "express";

import createComment from "@controller/comment/create-comment";


// import { createValidator } from "express-joi-validation"

// const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/:productId', createComment)

export default router


