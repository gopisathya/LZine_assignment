


var httpmsg = require("../config/httpmsg");
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var fs = require('fs');
var CryptoJS = require("crypto-js");
var path = require('path');
var model = null;
var settings = require('../config/settings');
    
exports.AuthMaster =AuthMasterApis ;

function AuthMasterApis(app, router, auth_model) {
console.log(router);
app.use('/api', router);
   
// Server side encryt and decrypt

    function encryptedAESdata(OriginalString) {
        var encryptedAES = CryptoJS.AES.encrypt(OriginalString, "ZLINE");
        console.log(encryptedAES.toString());
        return encryptedAES.toString();
    }

    function decryptedAESdata(Cipherdata) {
        var decrypted = CryptoJS.AES.decrypt(Cipherdata, EncryptKey).toString(CryptoJS.enc.Utf8);
        console.log(decrypted);
        return decrypted;
    }
function padWhile(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

// Register Api
router.post("/register",function(req, res){


                        new auth_model({
                         "authentication": {
                        "email_id": req.body.email_id,
                        "password": req.body.password
                        },
                        "status": req.body.status,
                        "added_date": Date.now()
                        }).save(function(err, doc) {
                            if (err) res.status(500).json({ success: true, msg: err });
                            else {
                                res.status(200).json({ success: true, result: doc });
                            };
                        })

                     }); 


// login verify Api
    
router.get("/login/:email_id", (req, res) => {
                    auth_model.findOne({"authentication.email_id" : req.params.email_id},function(err,doc){
                        if (err) res.json(err);
                        if (!doc) {
                            res.json({msg:'success'});
                        }else{
                            res.json({msg:'error'});
                        }
                    })
                })
    
}; // end of code