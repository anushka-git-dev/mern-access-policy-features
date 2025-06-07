import express from 'express';
import { getStudents, saveStudent } from '../controllers/studentController.js';


//create router for student
const studentRouter = express.Router();  


//connect router to controller/function
studentRouter.get('/', getStudents);   
studentRouter.post('/', saveStudent);


export default studentRouter;

