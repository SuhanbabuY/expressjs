const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('./config/db.js');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(layout);
app.set('layout', 'layouts/main');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index', { title: 'home', message: 'Hello there!' });
});
app.get('/connect', (req, res) => {

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM students limit 2', (err, results) => {
                if (err) {
                    res.send('Error executing query!');

                    
                } else {
                    console.log(results);
                    res.send(results);
                }
            });
        }
    });
});

app.get('/student', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM students order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('student/index', { title: 'Student Page', message: 'Welcome to the student page!', students: results });
                }
            });
        }
    });

});
app.get('/student/:id/show', (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
        res.status(400).send('Student ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('student/not_found', { title: 'Student not found', message: 'The requested student was not found.' });
                }
                else {
                    console.log(results);
                    res.render('student/show', { title: 'Student show Page', message: `Welcome to the student page for student ID: ${studentId}`, student: results[0] });
                }
            });
        }
    });
});

app.get('/student/create', (req, res) => {
    res.render('student/create', { title: 'Student Create Page', message: 'Welcome to the student create page!' });
});
app.post('/student', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const {admission_number, first_name, last_name,gender,date_of_birth,nic_number,birth_certificate_number,tele_number,house_id,grade_id,medium,date_of_admission,per_address,family_id} = req.body;

    // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!admission_number || !first_name || !last_name ) {
        res.status(400).send('All fields are required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO students ( admission_number, first_name, last_name,gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.send(err.sqlMessage);
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});