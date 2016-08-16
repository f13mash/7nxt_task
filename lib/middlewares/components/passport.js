/**
 * Created by mahesh on 16/08/16.
 */
var app = require('../../server'),
    config = require('../../config'),
    User = require('../../db').User,
    passport = require('passport');

var BearerStrategy = require('passport-http-bearer');
passport.use('api-bearer', new BearerStrategy(
    function(token, done) {
        User.findOne({ token: token }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));

module.exports = passport;
