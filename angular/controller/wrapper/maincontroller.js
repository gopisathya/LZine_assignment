app.controller('maincontroller',function($scope,$rootScope){






})

app.run(function($rootScope, $injector) {

    $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
        if (localStorage.SessionMessage) {
            console.log("run auth", headersGetter())
            var decryptedValue = decryptedAESdata(localStorage.SessionMessage);
            headersGetter()['authorization'] = decryptedValue;
        }
        if (data) {
            return angular.toJson(data);
        }
    };

    function encryptedAESdata(OriginalString) {
        var encryptedAES = CryptoJS.AES.encrypt(OriginalString, EncryptKey);
        console.log(encryptedAES.toString());
        return encryptedAES.toString();
    }

    function decryptedAESdata(Cipherdata) {
        var decrypted = CryptoJS.AES.decrypt(Cipherdata, EncryptKey).toString(CryptoJS.enc.Utf8);
        console.log(decrypted);
        return decrypted;
    }
});
