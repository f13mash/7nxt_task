/**
 * Created by mahesh on 08/08/16.
 */

var config = require('../config');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect(config.db.url);

mongoose.connection
    .on('open', function () {
        //db connected
    })
    .on('close', function () {
        //db closed
    });

//export models here
module.exports = {
    Config: require('./models/config'),
    User: require('./models/user')
}