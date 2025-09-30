import express from 'express';
import { createMeetingTest, deleteAllMeetings, getMeetings } from '../controller/testController.js';
// import { createMeetingTest, deleteAllMeetings, getMeetings } from '../controllers/testcalenderController.js';

const router = express.Router();

router.post('/test', createMeetingTest);
router.get('/testget', getMeetings);
router.delete('/delete', deleteAllMeetings);

export default router;