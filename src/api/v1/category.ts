import { Router } from "express";
import { upload } from "@middleware/upload";

import createCategory from "@controller/Category/create-category";
import findCategory from "@controller/Category/findCategory";
import allCategory from "@controller/Category/allCategory";

// import permission from "@middleware/permission";

const router = Router()

    .post('/', upload.single('file'), createCategory)
    .get('/:id', findCategory)
    .get('/', allCategory)

export default router


