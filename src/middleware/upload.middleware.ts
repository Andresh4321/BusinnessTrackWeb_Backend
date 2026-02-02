import multer from "multer";
import uuid from "uuid";
import path from "path";
import fs from "fs";
import { HttpError } from "../errors/http_error";
// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuid.v4();
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new HttpError(400, 'Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

export const uploads = {
    single: (fieldName: string) => upload.single(fieldName),
    array: (fieldName: string, maxCount: number) => upload.array(fieldName, maxCount),
    fields: (fieldsArray: { name: string; maxCount?: number }[]) => upload.fields(fieldsArray)
};

// ---------------- Item photos specific storage ----------------
const itemPhotosDir = path.join(__dirname, '../../public/item_photos');
if (!fs.existsSync(itemPhotosDir)) {
    fs.mkdirSync(itemPhotosDir, { recursive: true });
}

const itemPhotosStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, itemPhotosDir),
    filename: (req, file, cb) => {
        const unique = uuid.v4();
        const ext = path.extname(file.originalname);
        cb(null, `${unique}${ext}`);
    },
});

export const itemsUpload = multer({
    storage: itemPhotosStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});