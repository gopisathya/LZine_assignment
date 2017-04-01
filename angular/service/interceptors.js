var baseUrl = "http://localhost:3000/api";
app.factory('myInterceptor', function($q, jwtHelper, $injector) {
    var requestInterceptor = {
        request: function(config) {
            
            config.headers = config.headers || {};
            if (localStorage.SessionMessage) {
                var decryptedValue = decryptedAESdata(localStorage.SessionMessage);
                var jwt = decryptedValue.split(" ")[1];
                if (jwtHelper.isTokenExpired(jwt)) {
                    var authFactory = $injector.get('authFactory');
                    authFactory.verifytoken().then(function(response) {
                        console.log("response", JSON.stringify(response));
                    })
                    return config;

                } else {
                    config.headers['authorization'] = decryptedValue;
                    return config;
                    
                }
            } else {
                return config;
            }
            return config;
        },

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

    return requestInterceptor;
});

