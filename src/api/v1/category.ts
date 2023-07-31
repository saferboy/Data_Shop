import { Router } from "express";

import createCategory from "@controller/category/create-category";
import findCategory from "@controller/category/find-category";
import allCategory from "@controller/category/all-category";
import updateCategory from "@controller/category/update-category";
// import removeCategory from "@controller/Category/remove.category";
import { CategorySchema } from "@utils/joi.schema";


import { createValidator } from "express-joi-validation"

const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission(['admin', 'supervisor']), validator.body(CategorySchema.CreateCtg), createCategory)
    .get('/:id', permission(['none', 'user', 'admin', 'supervisor']), validator.params(CategorySchema.findCtg), findCategory)
    .get('/', permission(['none', 'user', 'admin', 'supervisor']), allCategory)
    .put('/:id', permission(['admin', 'supervisor']),updateCategory)
// .delete('/:id', permission('admin' || 'supervisor'), removeCategory)

export default router


