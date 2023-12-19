const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStragety = require('passport-local').Strategy;
const app = express();

const port = 3200;
const dbURL = 'mongodb+srv://duy777:duy777@cluster0.5gxf74l.mongodb.net/';

const routes = require('./routes/routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', routes)

const mongoString = dbURL;
mongoose.connect(mongoString)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
