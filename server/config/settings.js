var dbjson = {

    "name": "test",
    "host": "localhost",
    "dbname": "lzine_test",
    "port": 27017
}

exports.dbpath = "mongodb://" +  dbjson.host + ":" + dbjson.port + "/" + dbjson.dbname;
exports.port = 2017;
exports.responseType = "JSON";