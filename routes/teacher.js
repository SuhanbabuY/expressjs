const express = require('express');

const db = require('../config/db.js');
const router = express.Router();

//teacher delete route
router.delete('/:id', (req, res) => {
    const teacherId = req.params.id;
    console.log(`Deleting teacher with ID: ${teacherId}`);
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM teachers WHERE id = ?', [teacherId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/teachers');
                }
            });
        }
    });
});



// show page for a specific teacher
router.get('/:id/show', (req, res) => {
    const teacherId = req.params.id;
    if (!teacherId) {
        res.status(400).send('Teacher ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM teachers WHERE id = ?', [teacherId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('teachers/not_found', { title: 'Teacher not found', message: 'The requested teacher was not found.' });
                }
                else {
                    console.log(results);
                    res.render('teachers/show', { title: 'Teacher show Page', message: `Welcome to the teacher page for teacher ID: ${teacherId}`, teacher: results[0] });
                }
            });
        }
    });
});

//teacher edit route
router.get('/:id/edit', (req, res) => {
    const teacherId = req.params.id;
    if (!teacherId) {
        res.status(400).send('Teacher ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM teachers WHERE id = ?', [teacherId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('teacher/not_found', { title: 'Teacher not found', message: 'The requested teacher was not found.' });
                } else {
                    res.render('teachers/edit', { title: 'Edit Teacher Page' + "-" + results[0].last_name, teacher: results[0] });
                }
            });
        }
    });
});

//update teacher route
router.put('/:id', (req, res) => {
    const teacherId = req.params.id;
    const { registration_number,nic_number, first_name, last_name, gender ,title,date_of_birth,permanent_address} = req.body;

    if (!registration_number || !first_name || !last_name||!gender ||!title||!date_of_birth||!permanent_address) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE teachers SET registration_number = ?, nic_number = ?, first_name = ?, last_name = ?, gender = ?, title = ?, date_of_birth = ?, permanent_address = ? WHERE id = ?', [registration_number, nic_number, first_name, last_name, gender, title, date_of_birth, permanent_address, teacherId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/teachers');
                }
            });
        }
    });
});


//teacher create route
router.get('/create', (req, res) => {
    res.render('teachers/create', { title: 'Teacher Create Page', message: 'Welcome to the teacher create page!' });
});

//teacher create route
router.post('/', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { registration_number, nic_number, first_name, last_name, gender, title, date_of_birth, permanent_address } = req.body;

    // res.send(`Received data: Registration Number - ${registration_number}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!registration_number || !first_name || !last_name) {
        res.status(400).send('All fields are required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO teachers ( registration_number, nic_number, first_name, last_name, gender, title, date_of_birth, permanent_address ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)', [registration_number, nic_number, first_name, last_name, gender, title, date_of_birth, permanent_address], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.send(err.sqlMessage);
                } else {
                    res.redirect('/teachers');
                }
            });
        }
    });
});

// get teacher route
router.get('/', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query(
                'SELECT * FROM teachers ORDER BY id DESC LIMIT 10',
                (err, results) => {
                    if (err) {
                        res.send('Error executing query!');
                    } else {
                        console.log(results);

                        res.render('teachers/index', {
                            title: 'Teacher Page',
                            message: 'Welcome to the teacher page!',
                            teachers: results
                        });
                    }
                }
            );
        }
    });
});


module.exports = router;
