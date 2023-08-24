import { Router } from "express";

import createComment from "@controller/comment/create-comment";
import findComment from "@controller/comment/find-comment";
import allComment from "@controller/comment/all-comment";
import updateComment from "@controller/comment/update-comment";
import deleteComment from "@controller/comment/delete-comment";

import { CommentSchema } from "@utils/joi.schema";
import { createValidator } from "express-joi-validation"

const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission(["admin", "supervisor", "none", "user"]), validator.body(CommentSchema.CreateComment), createComment)
    .get('/:id', permission(["admin", "supervisor"]), findComment)
    .get('/', permission(["admin", "supervisor"]), allComment)
    .put('/:id', permission(["admin", "supervisor"]), updateComment)
    .delete('/:id', permission(["admin", "supervisor"]), deleteComment)

export default router


