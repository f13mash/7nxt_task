/**
 * Created by mahesh on 16/08/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConfigSchema = new Schema(schemaConfig());
ConfigSchema.statics.getConfig = getConfig;
ConfigSchema.statics.createConfig = createConfig;
var Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;


function schemaConfig() {
    return {
        name: String,
        token: String,
        access: {
            apps: [String],
            contexts: [String],
            entity_types: String
        }
    }
}


function getConfig(name, done) {
    Config.findOne({name: name}, function(err, config) {
        if(err) {
            return done(new Error("Database Error while looking up the config"));
        }
        return done(null, config);
    })
}


function createConfig(name, config, done) {
    config.name = name;
    errors = []
    validateConfig(config, schemaConfig(), errors, "");
    if(errors.length > 0) {
        return done(errors);
    }
    Config.findOneAndUpdate({name: name}, config, {upsert: true}, function (err, config) {
        if(err) return done(new Error("Unable to store the object"));
        console.log("config saved");
        return done(null, config);
    });
}

function validateConfig(configObj, configSchema, errors, ctxt) {
    for (var property in configObj) {
        if (configSchema.hasOwnProperty(property)) {
            if(getType(configObj[property]) !== getType(configSchema[property]))
                errors.push("type mismatch : "+ctxt+"/"+property)
            else if(isObject(configObj[property]))
                validateConfig(configObj[property], configSchema[property], errors, ctxt+"/"+property);
        }
        else {
            errors.push("unknown key : "+ctxt+"/"+property)
        }
    }
}

function getType(obj) {
    if(isObject(obj))
        return 'object';
    if(isArray(obj))
        return 'array';
    return 'string';
}
function isObject(a) {
    return (!!a) && (a.constructor === Object);
};
function isArray(a) {
    return (!!a) && (a.constructor === Array);
};
