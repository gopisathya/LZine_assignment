

var app = angular.module('app');
var baseUrl = "http://localhost:3000/api";
app.factory('authService', function($http){
	return{

	register: function(saveData) {
        console.log("service"+JSON.stringify(saveData));
            var send = $http({
                method: 'POST',
                url: baseUrl + '/register',
                data: saveData
            }).then(function successCallback(response) {
                console.log("SERVICE REG RESPONSE " + JSON.stringify(response, null, 2));
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
            return send;
        },


	}
})