import express from 'express';
import { postStudent, updateStudent, deleteStudent, getAllStudents, toggleStudentActiveStatus} from '../controller/studentController.js';

const studentRouter = express.Router();

studentRouter.post('/addstudent', postStudent);
studentRouter.put('/updatestudent/:id', updateStudent);
studentRouter.delete('/deletestudent/:id', deleteStudent);
studentRouter.put('/togglestudent/:id', toggleStudentActiveStatus);
studentRouter.get('/getstudent', getAllStudents);

export default studentRouter;
