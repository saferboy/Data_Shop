import { Router } from "express";

import updateUserOwnInfo from "@controller/User/updateUserOwnInfo";
import allUser from "@controller/User/allUser";
import changeUserRole from "@controller/User/updateUserRole";
import removeUser from "@controller/User/removeUser";

import { permission } from "@middleware/permission";

const router = Router()

    .get('/users', permission('admin'), allUser)
    .put('/:id', permission('user'), updateUserOwnInfo)
    .put('/role/:id', permission('supervisor'), changeUserRole)
    .delete('/:id', permission('admin'), removeUser)

export default router