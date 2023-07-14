import { Router } from "express";
import { upload } from "@middleware/upload";

import createProduct from "@controller/product/create.product";
import allProduct from "@controller/product/allProduct";
import findProduct from "@controller/product/findProductById";

// import permission from "@middleware/permission";

const router = Router()

    .post('/:id', upload.single('file'), createProduct)
    .get('/', allProduct)
    .get('/:id', findProduct)

export default router


