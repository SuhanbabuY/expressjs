const express = require('express');
const layout = require('express-ejs-layouts');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(layout);
app.set('layout', 'layouts/main');
app.get('/', (req, res) => {
    res.render('index', { title: 'home', message: 'Student Management System' });
});
app.get('/student', (req, res) => {
    res.render('student/index', {  title: 'Student Page', message: 'You are ! ' });
});
app.get('/student/:id/show', (req, res) => {
    const studentId = req.params.id;
    res.render('student/show', { title: 'Student show Page', message: `Welcome to the student page for student ID: ${studentId}` });
});

app.get('/student/create', (req, res) => {
    res.render('student/create', { title: 'Student Create Page', message: 'Welcome to the student create page!' });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});