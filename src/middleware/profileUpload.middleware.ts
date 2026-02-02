import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

const profileDir = path.join(__dirname, "../../public/profile_photos");

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, profileDir),
  filename: (_, file, cb) => {
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  },
});

export const profileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
