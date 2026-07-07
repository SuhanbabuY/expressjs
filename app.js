const express = require('express');
const app = express();
const port = 5000;

const mypage = (req, res) => {
    res.send('<h1 style="color: blue;">Welcome to my page</h1>');
};

app.get('/', mypage);

app.get('/about', (req, res) => {
    let myname = "suhanbabu";
    res.send(`<h1 style="color: green;">About Page</h1><p>Hello, my name is ${myname}.</p>`);
});

app.get('/contact', (req, res) => {
    res.send('<h1 style="color: red;">Contact Page</h1>');
});

app.get('/profile', (ss, yy) => {
    let myname = ss.query.name || "Guest";
    let myage = ss.query.age || "unknown";

    yy.send(
        `<h1 style="color: red;">Profile Page</h1><p>Hello, my name is ${myname} and I am ${myage} years old.</p>`
    );
});

app.get('/myinfo/:name/:age', (req, res) => {
    let myname = req.params.name || "Guest";
    let myage = req.params.age || "unknown";

    res.send(
        `<h1 style="color: red;">my Info Page</h1><p>Hello, my name is ${myname} and I am ${myage} years old.</p>`
    );
});
//parameterized route
//http://localhost:5000/phone1/red/50000/6.7
// Handle route parameters
app.get('/phone1/:color/:price/:size', (req, res) => {
    let mycolor = req.params.color || "unknown";
    let myprice = req.params.price || "unknown";
    let mysize = req.params.size || "unknown";

    res.send(
        `<h1 style="color: blue;">my Phone Page (Route Params)</h1><p>Hello, my color is ${mycolor}, price is ${myprice}, and size is ${mysize}.</p>`
    );
});
//-------------------------------------------------
//query string route

app.get('/phone', (req, res) => {
    let mycolor = req.query.color || "unknown";
    let myprice = req.query.price || "unknown";
    let mysize = req.query.size || "unknown";

    res.send(
        `<h1 style="color: blue;">my Phone Page</h1><p>Hello, my color is ${mycolor}, price is ${myprice}, and size is ${mysize}.</p>`
    );
});

//http://localhost:5000/phone?color=red&price=500&size=6.1
//http://localhost:5000/phone?color=blue&price=750&size=5.8
//http://localhost:5000/phone?color=black&price=1000&size=6.7
//-------------------------------------------

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});