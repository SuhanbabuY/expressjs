const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('../config/db.js');
const router = express.Router();
const { deleteStudent, getAllStudents, getStudentById } = require('../controllers/StudentApiController.js');
router.delete('/:id', deleteStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);

module.exports = router;
