/**
 * Created by mahesh on 05/08/16.
 */
var path = require('path');
var async = require('async');
var db = require(path.join(ROOT_DIR, 'lib/db'));
const seg_info_query = "select :seg_id as segment_id, count(*) as pax, sum(segment_price) as revenue from segment_traffic_log where segment_id=:seg_id";

module.exports.seg_info = function(req, res, next) {
    db.selectQuery(seg_info_query, {seg_id: req.params.seg_id}, function (err, result) {
        res.json({result: result[0], error: err});
    })
}
