const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('../config/db.js');
const router = express.Router();
const { deleteStudent, getAllStudents, getStudentById,editStudent,updateStudent,createStudent,addStudent} = require('../controllers/StudentController.js');


//student delete route
router.delete('/:id', deleteStudent);

//get student route
router.get('/', getAllStudents);

// show page for a specific student
router.get('/:id/show',getStudentById);


//student edit route
router.get('/:id/edit', editStudent);


//update student route
router.put('/:id',updateStudent);



//student create route
router.get('/create', createStudent);


//student create route
router.post('/', addStudent);



module.exports=router;
