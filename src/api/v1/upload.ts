import { Router } from "express";
import { upload } from "@middleware/upload";

import uploadFiles from "@controller/uploader/upload-files";
import allFile from "@controller/uploader/all-file";
import findFile from "@controller/uploader/find-file";
import updateFile from "@controller/uploader/update-file";

import { permission } from "@middleware/permission";

const router = Router()

    .post('/', upload.array('files'), uploadFiles)
    .get('/', permission(['admin', 'supervisor']), allFile)
    .get('/:id', permission(['admin', 'supervisor']), findFile)
    .put('/:id', permission(['admin', 'supervisor']), upload.array('files'), updateFile)

export default router