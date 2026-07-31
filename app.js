const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('./config/db.js');
const app = express();
const methodOverride = require('method-override');

const port = 3000;
app.set('view engine', 'ejs');
app.use(layout);
app.set('layout', 'layouts/main');
app.use(methodOverride('_method'));
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

//student delete route
app.delete('/student/:id', (req, res) => {
    const studentId = req.params.id;
    console.log(`Deleting student with ID: ${studentId}`);
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/student');
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

//student edit route
app.get('/student/:id/edit', (req, res) => {
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
                } else if (results.length === 0) {
                    res.status(404).render('student/not_found', { title: 'Student not found', message: 'The requested student was not found.' });
                } else {
                    res.render('student/edit', { title: 'Edit Student Page' +"-"+ results[0].last_name, student: results[0] });
                }
            });
        }
    });
});
app.put('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const { admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id } = req.body;

    if (!admission_number || !first_name || !last_name) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE students SET admission_number = ?, first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, nic_number = ?, birth_certificate_number = ?, tele_number = ?, house_id = ?, grade_id = ?, medium = ?, date_of_admission = ?, per_address = ?, family_id = ? WHERE id = ?', [admission_number, first_name, last_name, gender, date_of_birth, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id, studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
});


// create grade route----------------------------------------------------------------------------------------------------
app.get('/grades/create', (req, res) => {
    res.render('grades/create', { title: 'Grade Create Page', message: 'Welcome to the grade create page!' });
});


app.post('/grades', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { grade_name, grade_group, grade_order, colour } = req.body;

    // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!grade_name || !grade_group || !grade_order) {
        res.status(400).send('All fields are required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO grades ( grade_name, grade_group, grade_order, colour ) VALUES ( ?, ?, ?, ?)', [grade_name, grade_group, grade_order, colour], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.send(err.sqlMessage);
                } else {
                    res.redirect('/grades');
                }
            });
        }
    });
});

// grades show route

app.get('/grades', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('grades/index', { title: 'Grade Page', message: 'Welcome to the grade page!', grades: results });
                }
            });
        }
    });

});


// grades delete route
app.delete('/grades/:id', (req, res) => {
    const gradeId = req.params.id;
    console.log(`Deleting grade with ID: ${gradeId}`);
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/grades');
                }
            });
        }
    });
});
// grades edit route
app.put('/grades/:id', (req, res) => {
    const gradeId = req.params.id;
    const { grade_name, grade_group, grade_order, colour } = req.body;

    if (!grade_name || !grade_group || !grade_order) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE grades SET grade_name = ?, grade_group = ?, grade_order = ?, colour = ? WHERE id = ?', [grade_name, grade_group, grade_order, colour, gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/grades');
                }
            });
        }
    });
});

// 
app.get('/grades/:id/show', (req, res) => {
    const gradeId = req.params.id;
    if (!gradeId) {
        res.status(400).send('Grade ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('grades/not_found', { title: 'Grade not found', message: 'The requested grade was not found.' });
                }
                else {
                    console.log(results);
                    res.render('grades/show', { title: 'Grade show Page', message: `Welcome to the grade page for grade ID: ${gradeId}`, grade: results[0] });
                }
            });
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});