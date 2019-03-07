const express = require('express');
const app = express();
const router = express.Router();
const index = require('./routes/index');

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');


var config = require('./config');
var User   = require('./models/user');

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/api', index);

module.exports = app;