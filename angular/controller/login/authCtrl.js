app.controller('authCtrl',function($scope,$rootScope,authService,$localStorage){



console.log("Inside authCtrl");



$scope.gmail = {
    usename:"",
    email:""

};


$scope.onTabChanges = function(CurrentIndex){
	$scope.carrymodel = {};
	$scope.carrymodel.email = null;
    $scope.carrymodel.password = null;
    console.log("CurrentIndex", CurrentIndex);
    switch(CurrentIndex) {
    	case 1 :
    	this.carrymodelLoginForm.$setUntouched();
    	// $scope.login();
    	break;
    	case 2 :
    	// this.carrymodelLoginForm.$setUntouched();
    	// $scope.register();
    	break;
    	
    }
}


$scope.loginverified = function(carrymodel){

	console.log("enter Login Function");
	

}


$scope.register = function(carrymodel){
			var passmodel ={};
			
		    passmodel.email_id = carrymodel.email;
            passmodel.password = encryptedAESdata(randomPasswordGenerator(8));
            passmodel.status = true;
            console.log("enter register Function"+JSON.stringify(passmodel));

            authService.register(passmodel).then(function(response){
            	console.log("RES " + JSON.stringify(response));
                // var registerResponse = response.result;
            })


}





$scope.onGoogleLogin = function(){
    var params ={
        'clientid' : '984123710656-v26pv2ird66mi5ckhf7csjm70o8b3742.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': function(result){
            if(result['status']['signed_in']){
                var request =gapi.client.plus.people.get(
                    {
                        'userId':'me'
                    }
                    );
                request.execute(function(resp){
                    $scope.$apply(function() {
                        $scope.gmail.username =  resp.displayName;
                        $scope.email = resp.emails[0].value;
                    });
                });
            }

        },
        'approvalprompt':'force',
        'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };

    gapi.auth.signIn(params)
}






function randomPasswordGenerator(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
var EncryptKey = "GOPINATH";
function encryptedAESdata(OriginalString) {
        var encryptedAES = CryptoJS.AES.encrypt(OriginalString, EncryptKey);
        return encryptedAES.toString();
    }

    function decryptedAESdata(Cipherdata) {
        var decrypted = CryptoJS.AES.decrypt(Cipherdata, EncryptKey).toString(CryptoJS.enc.Utf8);
        console.log(decrypted);
        return decrypted;
    }


});



