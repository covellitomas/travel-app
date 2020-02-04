var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
mongoose.Promise = global.Promise;

// adding require dependencies
app.use(cors());
app.use(bodyParser.json());

// importing routes
var usersRouter = require('./route/user-router.js');
var placesRouter = require('./route/place-router.js');

// setting api
app.use('/api/user', usersRouter);
app.use('/api/place', placesRouter);
app.use(express.static('../crud-frontend'));

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/travelApp')
    .then(() => console.log('Connection succesfull at port 27017'))
    .catch((err) => console.error(err));

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server has been started at port: ' + PORT);
});

module.exports = app;
