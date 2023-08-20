import { Router } from "express";

import createBrand from "@controller/brand/create-brand";
import allBrands from "@controller/brand/all-brands";
import findBrand from "@controller/brand/find-brand-by-id";
import updateBrand from "@controller/brand/update-brand";
import removeBrand from "@controller/brand/remove-brand";

import { createValidator } from "express-joi-validation"

import { BrandChema } from "@utils/joi.schema";
const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', permission(['admin', 'supervisor']), validator.body(BrandChema.CreateBrand), createBrand)
    .get('/', allBrands)
    .get('/:id', validator.params(BrandChema.BrandParam), findBrand)
    .put('/:id', permission(['admin', 'supervisor']), validator.params(BrandChema.BrandParam), validator.body(BrandChema.CreateBrand), updateBrand)
    .delete('/:id', permission(['admin', 'supervisor']), validator.params(BrandChema.BrandParam), removeBrand)

export default router


