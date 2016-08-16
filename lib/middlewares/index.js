/**
 * Created by mahesh on 05/08/16.
 */
var app = require('../server'),
    path = require('path'),
    express = require('express'),
    config = require('./../config'),
    bodyParser = require('body-parser');

//app.use(favicon(path.join(ROOT_DIR, '/public/images/favicon.ico')));
app.use(express.static(path.join(ROOT_DIR, 'public')));

// pull information from html in POST
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(require('./components/passport').initialize());
