
    var settings = require('../config/settings');

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

var fs = require('fs');

    

    var authSchema = new mongoose.Schema({
    	"authentication": {
    		"email_id": { type: String, lowercase: true, index: true, unique: true, trim: true, required: [true, 'email_id is required'] },
    		"password": String,

    	},
    	"status":Boolean
    },{collection:'zline_auth'})

    module.exports =  mongoose.model('auth_model',authSchema);