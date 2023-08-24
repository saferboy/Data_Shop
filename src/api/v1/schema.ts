import { Router } from "express";

import createSchema from "@controller/schema/create-schema";
import allSchema from "@controller/schema/all-schema";
import findSchema from "@controller/schema/find-schema";
import deleteSchema from "@controller/schema/delete-schema";

// import { createValidator } from "express-joi-validation"
// const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission(["admin", "supervisor"]), createSchema)
    .get('/', permission(["admin", "supervisor"]), allSchema)
    .get('/:id', permission(["admin", "supervisor"]), findSchema)

    .delete('/:id', permission(["admin", "supervisor"]), deleteSchema)

export default router


