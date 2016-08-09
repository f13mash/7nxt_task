ROOT_DIR = __dirname + '/..';

//Setup Server
var app = require('./../lib/server');

//Setup Middlewares
require('./../lib/middlewares/index');

//Setup Routes
require('./../lib/routes/index');


//Start Server

require('http').createServer(app).listen(app.get('port'), function () {

    console.log('Express server listening on port ' + app.get('port'));
    console.log("Done. Server is ready and waiting for request.");
    console.log("***Open URL http://localhost:4000/segment/157 ***")
});

