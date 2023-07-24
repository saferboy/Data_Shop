import { Router } from "express";
import { upload } from "@middleware/upload";

import createCategory from "@controller/Category/create-category";
import findCategory from "@controller/Category/findCategory";
import allCategory from "@controller/Category/allCategory";
import updateCategory from "@controller/Category/updateCategory";
import removeCategory from "@controller/Category/remove.category";

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission('admin'), upload.single('file'), createCategory)
    .get('/:id', permission('user'), findCategory)
    .get('/', permission('user'), allCategory)
    .put('/:id', permission('admin'), upload.single('file'), updateCategory)
    .delete('/:id', permission('admin'), removeCategory)

export default router


