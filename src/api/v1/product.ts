import { Router } from "express";

import createProduct from "@controller/product/create-product";
import findProduct from "@controller/product/find-product";
import allProduct from "@controller/product/all-product";
import updateProduct from "@controller/product/update-product";

import { createValidator } from "express-joi-validation"

import { ProductSchema } from "@utils/joi.schema";
const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission(["admin", "supervisor"]), validator.body(ProductSchema.CreateProduct), createProduct)
    .get('/:id', permission(["admin", "supervisor"]), validator.params(ProductSchema.ProductParam), findProduct)
    .get('/', permission(["admin", "supervisor"]), allProduct)
    .put('/:id', permission(["admin", "supervisor"]), updateProduct)

export default router


