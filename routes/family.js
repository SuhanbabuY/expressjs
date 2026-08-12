const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('../config/db.js');
const router = express.Router();

//family delete route
router.delete('/:id', (req, res) => {
    const familyId = req.params.id;
    console.log(`Deleting family with ID: ${familyId}`);
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM families WHERE id = ?', [familyId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/family');
                }
            });
        }
    });
});

//get family route
router.get('/', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM families order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('family/index', { title: 'Family Page', message: 'Welcome to the family page!', families: results });
                }
            });
        }
    });

})

// show page for a specific family
router.get('/:id/show', (req, res) => {
    const familyId = req.params.id;
    if (!familyId) {
        res.status(400).send('Family ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM families WHERE id = ?', [familyId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('family/not_found', { title: 'Family not found', message: 'The requested family was not found.' });
                }
                else {
                    console.log(results);
                    res.render('family/show', { title: 'Family show Page', message: `Welcome to the family page for family ID: ${familyId}`, family: results[0] });
                }
            });
        }
    });
});

//family edit route
router.get('/:id/edit', (req, res) => {
    const familyId = req.params.id;
    if (!familyId) {
        res.status(400).send('Family ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM families WHERE id = ?', [familyId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('family/not_found', { title: 'Family not found', message: 'The requested family was not found.' });
                } else {
                    res.render('family/edit', { title: 'Edit Family Page' + "-" + results[0].last_name, family: results[0] });
                }
            });
        }
    });
});

//update family route
router.put('/:id', (req, res) => {
    const familyId = req.params.id;
    const {mobile_number, fa_first_name, mo_first_name, fa_job,mo_job,fa_nic_number,mo_nic_number,residential_address } = req.body;

    if (!mobile_number || !fa_first_name || !mo_first_name) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE families SET mobile_number = ?, fa_first_name = ?, mo_first_name = ?, fa_job = ?, mo_job = ?, fa_nic_number = ?, mo_nic_number = ?, residential_address = ? WHERE id = ?', [mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address, familyId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/family');
                }
            });
        }
    });
});


//family create route
router.get('/create', (req, res) => {
    res.render('family/create', { title: 'Family Create Page', message: 'Welcome to the family create page!' });
});

//family create route
router.post('/', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address } = req.body;

    // res.send(`Received data: Mobile Number - ${mobile_number}, Father's Name - ${fa_first_name}, Mother's Name - ${mo_first_name}`);
    if (!mobile_number || !fa_first_name || !mo_first_name) {
       
        res.status(400).send('All fields are required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO families ( mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)', [mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.send(err.sqlMessage);
                } else {
                    res.redirect('/family');
                }
            });
        }
    });
});


module.exports = router;