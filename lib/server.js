/**
 * Created by mahesh on 05/08/16.
 */
var app = require('express')(),
    path = require('path');

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(ROOT_DIR, 'views'));
app.set('view engine', 'jade');

module.exports = app;