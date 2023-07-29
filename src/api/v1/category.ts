import { Router } from "express";
import createCategory from "@controller/Category/create-category";
import findCategory from "@controller/Category/findCategory";
import allCategory from "@controller/Category/allCategory";
// import updateCategory from "@controller/Category/updateCategory";
// import removeCategory from "@controller/Category/remove.category";
import { CategorySchema } from "@utils/joi.schema";

import { role } from "@prisma/client";

// import { upload } from "@middleware/upload";
import { createValidator } from "express-joi-validation"

const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission([role.admin, role.supervisor]), validator.body(CategorySchema.CreateCtg), createCategory)
    .get('/:id', permission(['none', 'user', 'admin', 'supervisor']), validator.params(CategorySchema.findCtg), findCategory)
    .get('/', permission(['none', 'user', 'admin', 'supervisor']), allCategory)
// .put('/:id', permission('admin' || 'supervisor'), upload.single('file'), updateCategory)
// .delete('/:id', permission('admin' || 'supervisor'), removeCategory)

export default router


