const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('../config/db.js');
const router = express.Router();
const { deleteStudent, getAllStudents, getStudentById,addStudent,updateStudent} = require('../controllers/StudentApiController.js');
router.delete('/:id', deleteStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.put('/:id', updateStudent);

module.exports = router;
