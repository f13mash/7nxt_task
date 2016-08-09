/**
 * Created by mahesh on 09/08/16.
 */
ROOT_DIR = __dirname + '/..';

var util = require('util');
var path = require('path')
var config = require('./../lib/config');
var fs = require('fs');
var db_file = path.join(ROOT_DIR, config['db_path']);
const execSync = require('child_process').execSync;

function init_db() {
    cleanup();
    console.log("Initializing Database. This may take a minute or two.");
    var script_path = "./bin/db_init_script";
    var command = util.format("sqlite3 %s < %s", db_file, script_path);
    var output = execSync(command, {encoding: 'utf-8'})
    console.log(output);
    console.log("Database Initialized");
}

function cleanup() {
    if(fs.existsSync(db_file)) {
        console.log("Deleting db file %s", db_file)
        fs.unlinkSync(path.join(ROOT_DIR, config['db_path']));
    }
}

if(process.argv[2] && process.argv[2] == 'clean')
    cleanup();
else
    init_db();
