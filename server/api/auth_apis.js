var httpmsg = require("../config/httpmsg");
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var fs = require('fs');
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var path = require('path');
var rjwt = require('jsonwebtoken-refresh');
var model = null;
var settings = require('../config/settings');
var sessionvariable = [];
exports.AuthMaster =AuthMasterApis ;

function AuthMasterApis(app, router, auth_model, jwt) {
console.log(router);
app.use('/api', router);
   
// Server side encryt and decrypt

    function encryptedAESdata(OriginalString) {
        var encryptedAES = CryptoJS.AES.encrypt(OriginalString, "LZINE");
        console.log(encryptedAES.toString());
        return encryptedAES.toString();
    }

    function decryptedAESdata(Cipherdata) {
        var decrypted = CryptoJS.AES.decrypt(Cipherdata, EncryptKey).toString(CryptoJS.enc.Utf8);
        console.log(decrypted);
        return decrypted;
    }

// Register Api
router.post("/register",function(req, res){

    var decryptpassword = CryptoJS.AES.decrypt(req.body.password, "LZINE").toString(CryptoJS.enc.Utf8);
        console.log("regid"+JSON.stringify(decryptpassword));

        bcrypt.genSalt(11, function(err, salt){
        if(err) {
            return err;
        }
        bcrypt.hash(decryptpassword, salt, function(err, hashpassword){
            console.log("sign up hashpassword"+JSON.stringify(hashpassword));
            if(err){
                return err;
            }
            if (hashpassword) { 
                         new auth_model({
                         "authentication": {
                        "email_id": req.body.email_id,
                        "password": hashpassword
                        },
                        "status": req.body.status,
                        "added_date": Date.now()
                        }).save(function(err, doc) {
                            if (err) res.status(500).json({ success: true, msg: err });
                            else {
                                res.status(200).json({ success: true, result: doc });
                            };
                        })

                    };
                });
             });


     }); 


   

router.post("/login", function(req, res) {
        try {
            auth_model.findOne({"authentication.email_id" : req.body.email_id},function(err,doc){
                console.log("body",JSON.stringify(req.body.password));
                if (err) res.json(err)
                    if (doc) {
                       
                        var decryptpassword=CryptoJS.AES.decrypt(req.body.password, "LZINE").toString(CryptoJS.enc.Utf8);
                        console.log("1"+JSON.stringify(decryptpassword));
                        bcrypt.compare(decryptpassword, doc.authentication.password, function(err, isMatch){
                            console.log("1"+JSON.stringify(decryptpassword));
                            // console.log("2",JSON.stringify(doc.authentication.password));
                            if (err) {
                                return err;
                            }else{
                                if (isMatch) {
                                    if(sessionvariable.indexOf(doc.authentication.password) === -1){
                                        sessionvariable.push(doc.authentication.password);
                                    }
                                    console.log("sessionvariable::"+JSON.stringify(sessionvariable));
                                    var token = jwt.sign({"email_id" : req.body.email_id}, 'LZINE',{ expiresIn: 60*60*30});
                                    res.json({success:true,login:'success',email_id:doc.authentication.email_id,"token":"LZINE "+token});
                                }else{
                                    res.json({success:false,login:'Failed',msg:"Wrong Password"});
                                }
                                
                            }
                        })
                    }
            });
        } catch (err) {
            httpmsg.show500(req, res, err);
        }


    });



// onCheckmail Api

router.get("/checkemail/:email_id", (req, res) => {
                    auth_model.findOne({"authentication.email_id" : req.params.email_id},function(err,doc){
                        console.log("dw"+JSON.stringify(doc));
                        if (err) res.json(err);
                        if (!doc) {
                        
                            res.json({msg:'Available'});
                        }else{
                            res.json({msg:'Already Exist'});
                        }
                    })
                    
                })
    

}; // end of code



