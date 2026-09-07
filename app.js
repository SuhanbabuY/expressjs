const express = require('express');
const layout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(layout);
app.use(express.static('public'));
app.set('layout', 'layouts/main');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/students', require('./routes/student.js'));
app.use('/grades', require('./routes/grade.js'));
app.use('/houses', require('./routes/house.js'));
app.use('/subjects', require('./routes/subject.js'));
app.use('/teachers', require('./routes/teacher.js'));
app.use('/family', require('./routes/family.js'));
app.use('/studentApi', require('./routes/studentApi.js'));

app.get('/', (req, res) => {
    res.render('index', { title: 'home', message: 'This is the home page!' });
});

//testing purpose code start---------------------------------------------------------------
// app.get('/connect', (req, res) => {

//     db.connect((err) => {
//         if (err) {
//             res.send('Error connecting to the database!');
//         } else {
//             db.query('SELECT * FROM students limit 2', (err, results) => {
//                 if (err) {
//                     res.send('Error executing query!');

                    
//                 } else {
//                     console.log(results);
//                     res.send(results);
//                 }
//             });
//         }
//     });
// });
//testing purpose code end---------------------------------------------------------------


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

