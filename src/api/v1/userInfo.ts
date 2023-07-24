import { Router } from "express";

import updateUserOwnInfo from "@controller/User/updateUserOwnInfo";
import allUser from "@controller/User/allUser";
import changeUserRole from "@controller/User/updateUserRole";
import removeUser from "@controller/User/removeUser";
import findUserById from "@controller/User/findUserById";

import { permission } from "@middleware/permission";

const router = Router()

    .get('/users', permission('admin' || 'supervisor'), allUser)
    .get('/:id', permission('admin' || 'supervisor'), findUserById)
    .put('/:id', permission('user'), updateUserOwnInfo)
    .put('/role/:id', permission('supervisor'), changeUserRole)
    .delete('/:id', permission('supervisor'), removeUser)

export default router