const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.DATABASE_PORT;
const dbURL = process.env.DATABASE_URL;

const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use('/api', routes)

const bodyParser = require('body-parser');
const mongoString = dbURL;
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
