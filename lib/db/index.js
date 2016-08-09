/**
 * Created by mahesh on 08/08/16.
 */

var config = require('../config');
var path = require('path');
var Sequelize = require("sequelize");
var sequelize = new Sequelize(path.join(ROOT_DIR, config['db_path']), null, null, {storage: 'flixbus.db', dialect: 'sqlite'});

module.exports.selectQuery = function(query, replacements,cb) {
    sequelize.query(query,
        { replacements: replacements, type: sequelize.QueryTypes.SELECT }
    ).then(
        function(result) {
            return cb(null, result)
        }
        ,
        function (err) {
            return cb(err);
        }
    );
};
