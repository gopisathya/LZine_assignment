
var settings = require('../config/settings');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fs = require('fs');
// auth Schema
var authSchema = new mongoose.Schema({
    	"authentication": {
    		"email_id": { type: String, lowercase: true, index: true, unique: true, trim: true},
    		"password": String,
            "status":Boolean,
            "addedDate": Date

    	},
    	"status":Boolean
    },{collection:'zline_auth'})

    module.exports =  mongoose.model('auth_model',authSchema);

    // endsd