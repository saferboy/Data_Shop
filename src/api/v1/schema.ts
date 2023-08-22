import { Router } from "express";

import createSchema from "@controller/schema/create-schema";
import allSchema from "@controller/schema/all-schema";
import findSchema from "@controller/schema/find-schema";

// import { createValidator } from "express-joi-validation"
// const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', createSchema)
    .get('/', allSchema)
    .get('/:id', findSchema)

export default router


