import { Router } from "express";

import { createValidator } from "express-joi-validation"

import updateUserOwnInfo from "@controller/User/updateUserOwnInfo";
import allUser from "@controller/User/allUser";
import changeUserRole from "@controller/User/updateUserRole";
import removeUser from "@controller/User/removeUser";
import findUserById from "@controller/User/findUserById";
import allAdmins from "@controller/User/allAdmins";

import { Manageuser } from "@utils/joi.schema";
const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .get('/users', permission('admin' || 'supervisor'), allUser)
    .get('/admins', permission('supervisor'), allAdmins)
    .get('/:id', validator.params(Manageuser.finduser), permission('admin' || 'supervisor'), findUserById)
    .put('/:id', validator.body(Manageuser.updatUser), permission('user'), updateUserOwnInfo)
    .put('/role/:id',validator.params(Manageuser.finduser), validator.body(Manageuser.changeRole),  permission('supervisor'), changeUserRole)
    .delete('/:id', validator.params(Manageuser.deleteUser), permission('supervisor'), removeUser)

export default router