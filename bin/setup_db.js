/**
 * Created by mahesh on 09/08/16.
 */
ROOT_DIR = __dirname + '/..';

var async = require('async')
var util = require('util');
var Promise = require("bluebird");
var path = require('path')
var config = require('./../lib/config');
var fs = require('fs');
var db_file = path.join(ROOT_DIR, config['db_path']);
var exec = Promise.promisify(require('child_process').exec);


function runCommand() {

}

function download_feeds(cb) {
    //run these commands in parallel
    console.log("Downloading feeds");
    feed_load_cmds = [
        exec(util.format("curl -s https://s3.eu-central-1.amazonaws.com/data-science-homework/data-engineer/homework_rides.csv | tail -n +2 > %s", path.join(ROOT_DIR, "static_db/homework_rides.csv"))),
        exec(util.format("curl -s https://s3.eu-central-1.amazonaws.com/data-science-homework/data-engineer/homework_segments.csv | tail -n +2 > %s", path.join(ROOT_DIR, "static_db/homework_segments.csv"))),
        exec(util.format("curl -s https://s3.eu-central-1.amazonaws.com/data-science-homework/data-engineer/homework_route_segments.csv | tail -n +2 > %s", path.join(ROOT_DIR, "static_db/homework_route_segments.csv"))),
        exec(util.format("curl -s https://s3.eu-central-1.amazonaws.com/data-science-homework/data-engineer/homework_tickets.csv.gz | gunzip | tail -n +2 > %s", path.join(ROOT_DIR, "static_db/homework_tickets.csv")))
    ]
    return Promise.all(feed_load_cmds);

}

function init_db() {
    console.log("Initializing Database. This may take a minute or four.");
    var script_path = path.join(ROOT_DIR, "./bin/db_init_script");
    var command = util.format("sqlite3 %s < %s", db_file, script_path);

    cleanup();
    //.then(execSync(command, {encoding: 'utf-8'}))
    download_feeds()
        .then(function() {
            console.log("running sql import");
            return exec(command);
        })
        .then(function () {
            return exec("rm -rf " + path.join(ROOT_DIR, "static_db/*.csv"));
        })
        .then(function() {
            console.log("Database Initialized");
        });
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
    //init_db();
