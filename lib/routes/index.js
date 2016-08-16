/**
 * Created by mahesh on 05/08/16.
 */
var app = require('../server');
var router = require('express').Router();

app.use("/", require('passport').authenticate('api-bearer', { session: false }), router);

//auth
router.use("/", require('./handlers/index'))
router.use("/api", require('./handlers/api'))
