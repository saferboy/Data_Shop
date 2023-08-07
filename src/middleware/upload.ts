import multer from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

const formats = ["image/png", "image/jpg", "image/gif", "image/svg+xml"];

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    const ext = extname(file.originalname);
    const format = file.mimetype
    if (!formats.includes(format)) {
      return callback(new Error("Format error"), file.originalname)
    }
    callback(null, uuid() + ext)
  },
});

export const upload = multer({ storage });
