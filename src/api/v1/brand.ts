import { Router } from "express";

import createBrand from "@controller/brand/create-brand";
import allBrands from "@controller/brand/all-brands";
import findBrand from "@controller/brand/find-brand";
import updateBrand from "@controller/brand/update-brand";

import { createValidator } from "express-joi-validation"

import { BrandChema } from "@utils/joi.schema";
const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/:id', permission(['admin', 'supervisor']), validator.body(BrandChema.CreateBrand), createBrand)
    .get('/', permission(['admin', 'supervisor']), allBrands)
    .get('/:id', permission(['admin', 'supervisor']), findBrand)
    .put('/:id', permission(['admin', 'supervisor']), validator.body(BrandChema.CreateBrand), updateBrand)

export default router


