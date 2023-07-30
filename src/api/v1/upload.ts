import { Router } from "express";
import { upload } from "@middleware/upload";
import uploadFiles from "@controller/uploader/upload-files";

const router = Router()

router.post('/down', upload.array('files'), uploadFiles)

export default router