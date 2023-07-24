import { Router } from "express";

import updateUserOwnInfo from "@controller/User/updateUserOwnInfo";
import allUser from "@controller/User/allUser";
import changeUserRole from "@controller/User/updateUserRole";

import { permission } from "@middleware/permission";

const router = Router()

    .put('/:id', permission('user'), updateUserOwnInfo)
    .get('/users', permission('admin'), allUser)
    .put('/role/:id', permission('admin'), changeUserRole)

export default router