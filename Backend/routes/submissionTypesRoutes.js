import express from "express";
import { authorize } from "../middleware/auth.js";
import { roles } from "../utils/utilities.js";
import { createSubmissionType, deleteSubmissionType, findSubmissionTypes, updateSubmissionType } from "../services/submissionTypeServices.js";

const { STUDENT, ADMIN } = roles;

const router = express.Router();

router.post('/', authorize(ADMIN), createSubmissionType);
router.get('/', findSubmissionTypes);
router.put('/', authorize(ADMIN), updateSubmissionType);
router.delete('/', authorize(ADMIN), deleteSubmissionType);

export default router;