import express from "express";
import { authorize } from "../middleware/auth.js";
import { getFilesList, uploadFile, getFile, deleteFile } from "../services/s3Services.js";
import { roles } from "../utils/utilities.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const { STUDENT, PANEL_MEMBER, SUPERVISOR } = roles;

const router = express.Router();

router.put('/',upload.single('file'), uploadFile);
router.get('/',  getFilesList);
router.get('/:folder/:type/:key', getFile);
router.delete('/:folder/:type/:key', authorize(STUDENT), deleteFile);

export default router;