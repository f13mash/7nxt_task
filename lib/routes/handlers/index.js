/**
 * Created by mahesh on 05/08/16.
 */
var router = require('express').Router();

router.get('/', function(req, res, next){
    res.render('index', { title: 'Express', req: req, user: req.user ? req.user : false});
})

module.exports = router;
