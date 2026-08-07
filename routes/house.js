const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('../config/db.js');
const router = express.Router();

//house delete route
router.delete('/:id', (req, res) => {
    const houseId = req.params.id;
    console.log(`Deleting house with ID: ${houseId}`);
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM houses WHERE id = ?', [houseId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/houses');
                }
            });
        }
    });
});

//get house route
router.get('/', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM houses order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('houses/index', { title: 'House Page', message: 'Welcome to the house page!', houses: results });
                }
            });
        }
    });

})

// show page for a specific house
router.get('/:id/show', (req, res) => {
    const houseId = req.params.id;
    if (!houseId) {
        res.status(400).send('House ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM houses WHERE id = ?', [houseId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('houses/not_found', { title: 'House not found', message: 'The requested house was not found.' });
                }
                else {
                    console.log(results);
                    res.render('houses/show', { title: 'House show Page', message: `Welcome to the house page for house ID: ${houseId}`, house: results[0] });
                }
            });
        }
    });
});

//house edit route
router.get('/:id/edit', (req, res) => {
    const houseId = req.params.id;
    if (!houseId) {
        res.status(400).send('House ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM houses WHERE id = ?', [houseId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('houses/not_found', { title: 'House not found', message: 'The requested house was not found.' });
                } else {
                    res.render('houses/edit', { title: 'Edit House Page' + "-" + results[0].house_name, house: results[0] });
                }
            });
        }
    });
});

//update house route
router.put('/:id', (req, res) => {
    const houseId = req.params.id;
    const { house_name, house_color } = req.body;

    if (!house_name || !house_color) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE houses SET house_name = ?, house_color = ? WHERE id = ?', [house_name, house_color, houseId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/houses');
                }
            });
        }
    });
});


//house create route
router.get('/create', (req, res) => {
    res.render('houses/create', { title: 'House Create Page', message: 'Welcome to the house create page!' });
});

//house create route
router.post('/', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { house_name, house_color } = req.body;

    // res.send(`Received data: House Name - ${house_name}, House Color - ${house_color}`);
    if (!house_name || !house_color) {
        res.status(400).send('All fields are required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO houses (house_name, house_color) VALUES (?, ?)', [house_name, house_color], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.send(err.sqlMessage);
                } else {
                    res.redirect('/houses');
                }
            });
        }
    });
});


module.exports = router;
