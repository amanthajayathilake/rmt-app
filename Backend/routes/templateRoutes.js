import express from "express";
import { authorize } from "../middleware/auth.js";
import { createTemplate, deleteTemplate, findTemplates, updateTemplate } from "../services/templateServices.js";
import { roles } from "../utils/utilities.js";

const { STUDENT, ADMIN } = roles;

const router = express.Router();

router.post('/', authorize(ADMIN), createTemplate);
router.get('/', findTemplates);
router.put('/', authorize(ADMIN), updateTemplate);
router.delete('/', authorize(ADMIN), deleteTemplate);

export default router;