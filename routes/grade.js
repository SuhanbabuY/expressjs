const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('../config/db.js');
const router = express.Router();



// create grade route----------------------------------------------------------------------------------------------------
router.get('/create', (req, res) => {
    res.render('grades/create', { title: 'Grade Create Page', message: 'Welcome to the grade create page!' });
});


router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
    const gradeId = req.params.id;

    db.query(
        'SELECT * FROM grades WHERE id = ?',
        [gradeId],
        (err, results) => {
            if (err) {
                return res.send('Error executing query! ' + err);
            }

            if (results.length === 0) {
                return res.send('Grade not found');
            }

            res.render('grades/edit', {
                title: 'Edit Grade',
                grade: results[0]
            });
        }
    );
});
// grades update route
router.put('/:id', (req, res) => {
    const gradeId = req.params.id;
    const { grade_name, grade_group, grade_order, colour } = req.body;

    if (!grade_name || !grade_group || !grade_order) {
        return res.status(400).send('All fields are required');
    }

    db.query(
        'UPDATE grades SET grade_name=?, grade_group=?, grade_order=?, colour=? WHERE id=?',
        [grade_name, grade_group, grade_order, colour, gradeId],
        (err, results) => {
            if (err) {
                return res.send('Error updating grade: ' + err);
            }

            res.redirect('/grades');
        }
    );
});

// show page for a specific grade
router.get('/:id/show', (req, res) => {
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

module.exports = router;