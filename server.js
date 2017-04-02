var fs = require('fs');
var path = require('path');
var express =  require('express');
var app = express();


var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var settings = require('./server/config/settings');

var server = require('http').Server(app);

var compression = require('compression');
var port = 3000;

app.use(compression());
app.use('/',express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var jwt = require('jsonwebtoken');

function onLoadFunction() {
    gapi.client.setApis('AIzaSyBoq7uY_uBlvegU_3g-v8lxg_-l4YRaAfk');
    gapi.client.load('plus', 'v1', function(){})
}

/** INITIALIZE **/
app.get('/',(req,res) => {
    res.send("The Api is at http://localhost:" + port + "/api");
})
// APP LISTEN ON PORT 8080
app.listen(port,() => {
    console.log("API RUN ON PORT "+port);
})

  // CONNECT DATABASE
    mongoose.connect(settings.dbpath, {
        server: {
            socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
        }
    });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("db connected successfully".green);
    });

    db.on('disconnected', function() {
        console.log("db disconnected".red);
        //Reconnect on timeout
        mongoose.connect(settings.dbpath);
        db = mongoose.connection;
    });

       //DATABASE MIGRATION
    var auth_model = require('./server/models/auth_model');
  
    // API CALLS
    require('./server/api/auth_apis').AuthMaster(app, router, auth_model);

module.exports = router;