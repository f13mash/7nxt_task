/**
 * Created by mahesh on 05/08/16.
 */
var router = require('express').Router();



var Segment = require('./api/segment');

router.get('/pax/:seg_id', Segment.seg_info);

router.get('/revenue/:seg_id', Segment.seg_info);

router.get('/segment/:seg_id', Segment.seg_info);

module.exports = router;
