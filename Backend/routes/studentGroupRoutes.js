import express from "express";
import { authorize } from "../middleware/auth.js";
import { 
    fetchAllStudentGroups, 
    registerStudentGroup, 
    requestSupervisor, 
    requestCoSupervisor, 
    allocateOrDeallocatePanels, 
    assignMarks, 
    fetchStudentGroup, 
    updateResearchTopicDetails, 
    evaluateStudentGroupByPanel,
    acceptRejectGroup
} from "../services/studentGroupService.js";
import { roles } from "../utils/utilities.js";
const { STUDENT, ADMIN, PANEL_MEMBER, SUPERVISOR } = roles;

const router = express.Router();

router.post('/', authorize(STUDENT), registerStudentGroup);
router.get('/', authorize(ADMIN, PANEL_MEMBER, SUPERVISOR, STUDENT), fetchAllStudentGroups);
router.put('/:id/supervisors', authorize(STUDENT), requestSupervisor);
router.put('/:id/cosupervisors', authorize(STUDENT), requestCoSupervisor);
router.put('/:id/panels', authorize(ADMIN), allocateOrDeallocatePanels);
router.put('/:id/evaluations', authorize(PANEL_MEMBER), assignMarks);
router.get('/details/', authorize(STUDENT,ADMIN, PANEL_MEMBER, SUPERVISOR), fetchStudentGroup);
router.put('/:id/updateTopic', authorize(ADMIN, STUDENT), updateResearchTopicDetails);
router.put('/:id/evaluateStudentGroup', authorize(ADMIN, PANEL_MEMBER, SUPERVISOR), evaluateStudentGroupByPanel);
router.put('/:id/status', authorize(SUPERVISOR), acceptRejectGroup);
export default router;