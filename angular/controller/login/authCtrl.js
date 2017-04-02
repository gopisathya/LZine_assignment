app.controller('authCtrl',function($scope,$rootScope,authService,$localStorage,$state,$mdToast,$window,$location,$timeout,$document){

 // initalizes to googleapis
$scope.gmail = {
    usename:"",
    email:""

};

// Find tab changes
$scope.onTabChanges = function(CurrentIndex){
	$scope.carrymodel = {};
	$scope.carrymodel.email = null;
    $scope.carrymodel.password = null;
    console.log("CurrentIndex", CurrentIndex);
    switch(CurrentIndex) {
    	case 1 :
    	this.carrymodelLoginForm.$setUntouched();
    	break;
    	case 2 :
        this.carrymodelLoginForm.$setUntouched();
        break;
    	
    }
}

// Login verification

$scope.loginverified = function(carrymodel){

	console.log("enter Login Function");
    authService.login(carrymodel).then(function(response) 
      { 
              console.info("result"+JSON.stringify(response.data));
              $state.go('dashboard');

   });

}

// Register Form function

$scope.register = function(carrymodel){
			var passmodel ={};
			
		    passmodel.email_id = carrymodel.email;
            passmodel.password = encryptedAESdata(randomPasswordGenerator(8));
            passmodel.status = true;
            console.log("enter register Function"+JSON.stringify(passmodel));

            authService.register(passmodel).then(function(response){
            	console.log("RES " + JSON.stringify(response));
                $mdToast.show($mdToast.simple().textContent('Updated SuccessFully!').hideDelay(2500).action('OK'));
                $scope.carrymodel={ email :undefined,password:''}; 
                $window.location.reload();
            })
}

 // onGoogleLogin function

$scope.onGoogleLogin = function(){
    var params ={
        'clientid' : '984123710656-v26pv2ird66mi5ckhf7csjm70o8b3742.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': function(result){
            if(result['status']['signed_in']){
                var request = gapi.client.request({'path': 'https://people.googleapis.com/v1/people/me'});
                // console.info(typeof request);
                // var request = gapi.client.Request.execute(function(e){console.info(e);});
                request.execute(function(resp){
                    console.info(resp);
                    $scope.$apply(function() {
                        $scope.gmail.username =  resp.names[0].displayName;
                        $scope.gmail.email = resp.emailAddresses[0].value;
                        $state.go('dashboard');
                    });
                });
            }

        },
        'approvalprompt':'force',
        'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };

    gapi.auth.signIn(params);
}

// randomPasswordGenerator
function randomPasswordGenerator(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

var EncryptKey = "ZLINE";
function encryptedAESdata(OriginalString) {
        var encryptedAES = CryptoJS.AES.encrypt(OriginalString, EncryptKey);
        return encryptedAES.toString();
    }

    function decryptedAESdata(Cipherdata) {
        var decrypted = CryptoJS.AES.decrypt(Cipherdata, EncryptKey).toString(CryptoJS.enc.Utf8);
        console.log(decrypted);
        return decrypted;
    }

// Logout

$scope.Logout = function(){
    console.log("enter Logout Function");

    $state.go('login');

}
});



