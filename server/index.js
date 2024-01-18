const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const port = 3200;
const dbURL = 'mongodb+srv://duy777:duy777@cluster0.5gxf74l.mongodb.net/';

require('dotenv').config();

const route = require('./routes/index.routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('files'));
app.use(passport.initialize());

route(app)

const mongoString = dbURL;
mongoose.connect(mongoString)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.listen(3200, () => {
    console.log(`Server Started at ${port}`)
});

