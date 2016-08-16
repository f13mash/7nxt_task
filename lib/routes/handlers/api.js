/**
 * Created by mahesh on 05/08/16.
 */
var router = require('express').Router();



var Config = require('./api/config');

router.get('/config/:name', Config.getConfig);
router.post('/config/:name', Config.createConfig);


module.exports = router;
