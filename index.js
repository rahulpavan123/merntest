const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/employee_db');
const db = mongoose.connection;
db.on('error', (e) => console.log(e))
db.once('open', () => console.log('Connected to the database'))
const app = express();
app.set('view engine', 'ejs');
const port = 5001;

// middlwears
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('uploads'));

// route prefix
app.use('', require('./routes/routes'));

// app.get('/', (req, res) => {
//     res.send('Hi');
// })

app.listen(port, () => {
    console.log('abc');    
})
