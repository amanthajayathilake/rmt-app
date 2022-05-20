import express from "express";
import { authorize } from "../middleware/auth.js";
import { createMarkingScheme, deleteMarkingScheme, findMarkingSchemes, updateMarkingScheme } from "../services/markingSchemeService.js";
import { roles } from "../utils/utilities.js";

const { STUDENT, ADMIN } = roles;

const router = express.Router();

router.post('/', authorize(ADMIN), createMarkingScheme);
router.get('/', findMarkingSchemes);
router.put('/', authorize(ADMIN), updateMarkingScheme);
router.delete('/', authorize(ADMIN), deleteMarkingScheme);

export default router;