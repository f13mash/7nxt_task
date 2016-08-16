/**
 * Created by mahesh on 05/08/16.
 */
var path = require('path');
var async = require('async');
var Config = require(path.join(ROOT_DIR, 'lib/db')).Config;

module.exports.getConfig = function(req, res, next) {

    Config.getConfig(req.params.name, function (err, result) {
        if(err) {return res.json(err, 500);}
        if(result) {return res.json(result);}
        return res.json(null, 404);
    })
}

module.exports.createConfig = function (req, res, next) {
    Config.createConfig(req.params.name, req.body, function (err, result) {
        if(err) { return res.json(err, 500);}
        res.json("success");
    })
}
