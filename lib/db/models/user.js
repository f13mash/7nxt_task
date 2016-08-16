/**
 * Created by mahesh on 16/08/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema(schemaConfig());
UserSchema.statics.getUser = getUser;
var User = mongoose.model('User', UserSchema);

module.exports = User;

function schemaConfig() {
    return {
        token: {type: String, required: true, index: { unique: true }}
    }
}

function getUser(token, done) {
    User.findOne({token: token}, function(err, user) {
        if(err)
            return done(err);
        else
            return done(null, user);
    })
}

