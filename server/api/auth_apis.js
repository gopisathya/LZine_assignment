


    var httpmsg = require("../config/httpmsg");
    
    var mongoose = require('mongoose');
    var bcrypt = require('bcryptjs')
    var fs = require('fs');
    var CryptoJS = require("crypto-js");
    var path = require('path');
    var model = null;
    var settings = require('../config/settings');
    
   
    exports.AuthMaster =AuthMasterApis ;


function AuthMasterApis(app, router, auth_model, jwt) {

   
// Server side encryt and decrypt

    function encryptedAESdata(OriginalString) {
        var encryptedAES = CryptoJS.AES.encrypt(OriginalString, "GOPINATH");
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


router.post("/register",function(req, res){
try {
    settings.tokenverification(req, jwt, function(err, callback) {
console.log("res"+JSON.stringify(res.body,null,2));
var empids;
    async.waterfall([
            function(callback) {
                auth_model.findByIdAndUpdate('empid', { $inc: { seq: 1 } }, function(err, data) {
                    if (err) callback(err);
                    empids = "ZLINE" + padWhile(data.seq, 5);
                    callback(null, empids);
                });
            },
        
function(empid, callback) {
var decryptpassword = CryptoJS.AES.decrypt(req.body.authentication.password, "GOPINATH").toString(CryptoJS.enc.Utf8);
	bcrypt.genSalt(11, function(err, salt) {
	if (err) {
	callback(err);
	}
	bcrypt.hash(decryptpassword, salt, function(err, hashpassword) {
	if (err) {
	callback(err);
	}
	if (hashpassword) {
	new usermanagement_self_model({
		 "authentication": {
		"email_id": req.body.authentication.email_id,
		"password": hashpassword
		},

		}).save(function(err, doc) {
        var startDate = moment();
        if (err) {
            callback(err);
        } else {
            
            var email = doc.authentication.email_id;
            
           
        };
    }); // save end 
} else {
    return res.json({ success: false })
} // if hashpassword end

}); // bcrypt hash end 

}); // bcrypt end

}
],// Waterfall
function(err, results) {
if (err) res.json({ success: false, err: err })
return res.json({ success: true })
});
})
        } catch (err) {
            if (err) res.status(500).json({ success: false, msg: err })
        }
         
})




    }


