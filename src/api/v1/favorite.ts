import { Router } from "express";

import createFavorite from "@controller/favorite/create-favorite";
import findFavorite from "@controller/favorite/find-favorite-by-id";
import allFavorite from "@controller/favorite/all-favorite";
import removeFavorite from "@controller/favorite/remove-favorite";

import { createValidator } from "express-joi-validation"
const validator = createValidator()



import { permission } from "@middleware/permission";
import { FavoriteSchema } from "@utils/joi.schema";

const router = Router()

    .post('/', permission(['user']), createFavorite)
    .get('/:id', permission(["user"]), validator.params(FavoriteSchema.FindFavorite), findFavorite)
    .get('/', permission(["admin", "supervisor"]), allFavorite)
    .delete('/:id', permission(["supervisor"]), removeFavorite)

export default router


