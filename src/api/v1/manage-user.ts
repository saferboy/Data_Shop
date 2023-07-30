import { Router } from "express";

import { createValidator } from "express-joi-validation"

import updateUserOwnInfo from "@controller/user/update-user-own-info";
import allUser from "@controller/user/all-user";
import changeUserRole from "@controller/user/update-user-role";
import removeUser from "@controller/user/remove-user";
import findUserById from "@controller/user/find-user-by-id";
import allAdmins from "@controller/user/all-admins";

import { ManageUser } from "@utils/joi.schema";
const validator = createValidator()

import { permission } from "@middleware/permission";

const router = Router()

    .get('/users', permission(['admin', 'supervisor']), allUser)
    .get('/admins', permission(['supervisor']), allAdmins)
    .get('/:id', validator.params(ManageUser.finduser), permission(['admin' || 'supervisor']), findUserById)
    .put('/:id', validator.body(ManageUser.updatUser), permission(['user']), updateUserOwnInfo)
    .put('/role/:id', validator.params(ManageUser.finduser), validator.body(ManageUser.changeRole), permission(['supervisor']), changeUserRole)
    .delete('/:id', validator.params(ManageUser.deleteUser), permission(['supervisor']), removeUser)

export default router