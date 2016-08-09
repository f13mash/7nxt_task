/**
 * Created by mahesh on 05/08/16.
 */
var app = require('../server');

// define routes here
app.use('/', require('./handlers/api'));

// api routes
app.use('/api', require('./handlers/api'));
