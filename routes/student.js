const express = require('express');
const layout = require('express-ejs-layouts');
const db = require('./config/db.js');
const app = express();
const methodOverride = require('method-override');
const router = express.Router();

const port = 3000;
app.set('view engine', 'ejs');
app.use(layout);
app.set('layout', 'layouts/main');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));




//student delete route
router.delete('/student/:id', (req, res) => {
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

//get student route
router.get('/student', (req, res) => {
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

})