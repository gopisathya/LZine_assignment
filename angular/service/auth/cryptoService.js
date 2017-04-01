(function() {
    'use strict';
    
    app.service('cryptoService', function() {

        this.encryptedAESdata = function(OriginalString) {
            var encryptedAES = CryptoJS.AES.encrypt(OriginalString, EncryptKey);
            return encryptedAES.toString();
        };
        this.decryptedAESdata = function(Cipherdata) {
            var decrypted = CryptoJS.AES.decrypt(Cipherdata, "GOPINATH").toString(CryptoJS.enc.Utf8);
            return decrypted;
        }

    })
})();
