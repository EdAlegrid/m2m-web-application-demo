'use strict';

var path = require('path');
var logger = require('morgan');
var express = require('express');
var client = require('./m2m/client.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));

var indexRoute = require('./routes/index.js');

app.use('/', indexRoute);

app.listen(4000);
console.log('http listening on port 4000');
