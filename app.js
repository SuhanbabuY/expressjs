const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const mypage = (req, res) => {
    console.log(path.join(__dirname, 'pages', 'index.html'));
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
};
app.get('/', mypage);

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'about.html'))
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contact.html'))
});
app.get('/profile', (req, res) => {
    let myname = req.query.name || "Guest";
    let myage = req.query.age || "unknown";
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'))
});
app.get('/myinfo/:name/:age', (req, res) => {
    let myname = req.params.name || "Guest";
    let myage = req.params.age || "unknown";
    res.sendFile(path.join(__dirname, 'pages', 'myinfo.html'))
});

//parameterized route
//http://localhost:5000/phone1/red/50000/6.7
// Handle route parameters
// app.get('/phone1/:color/:price/:size', (req, res) => {
//     let mycolor = req.params.color || "unknown";
//     let myprice = req.params.price || "unknown";
//     let mysize = req.params.size || "unknown";

//     res.send(
//         `<h1 style="color: blue;">my Phone Page (Route Params)</h1><p>Hello, my color is ${mycolor}, price is ${myprice}, and size is ${mysize}.</p>`
//     );
// });
//-------------------------------------------------
//query string route

// app.get('/phone', (req, res) => {
//     let mycolor = req.query.color || "unknown";
//     let myprice = req.query.price || "unknown";
//     let mysize = req.query.size || "unknown";

//     res.send(
//         `<h1 style="color: blue;">my Phone Page</h1><p>Hello, my color is ${mycolor}, price is ${myprice}, and size is ${mysize}.</p>`
//     );
// });

//http://localhost:5000/phone?color=red&price=500&size=6.1
//http://localhost:5000/phone?color=blue&price=750&size=5.8
//http://localhost:5000/phone?color=black&price=1000&size=6.7
//-------------------------------------------

app.get('/student', (req, res) => {
    res.send("show student details");
});// show student details
app.get('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send(`show student details for student with ID: ${studentId}`);
});// show student details
app.post('/student', (req, res) => {
    res.send("create a new student");
});// add new student
app.put('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send(`update student details for student with ID: ${studentId}`);
});// update student details
app.delete('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send(`delete student with ID: ${studentId}`);
});// delete student
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});