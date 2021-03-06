

var app = angular.module('app');
var baseUrl = "http://localhost:3000/api";
app.factory('authService', function($http){
	return{
        login:function(data)
    { 
        var send=$http({
          method: 'POST',
          url: 'http://localhost:3000/api/login',
          data:data
        }).then(function successCallback(response) {
            return response;
          }, function errorCallback(response) {
            return response;
          });
        return send;    
    },
    
    // register service

	register: function(saveData) {
        console.log("service"+JSON.stringify(saveData));
            var send = $http({
                method: 'POST',
                url: baseUrl + '/register/',
                data: saveData
            }).then(function successCallback(response) {
                console.log("SERVICE REG RESPONSE " + JSON.stringify(response, null, 2));
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
            return send;
        },

    // onCheckMail service

    OnCheckMail: function(saveData) {
        console.log("service"+JSON.stringify(saveData));
            var send = $http({
                method: 'GET',
                url: baseUrl+'/checkemail/'+saveData.email_id,
            }).then(function successCallback(response) {
                console.log("SERVICE REG RESPONSE " + JSON.stringify(response.data, null, 2));
                return response.data;
            }, function errorCallback(response) {
                return response.data;
            });
            return send;
        },



	}
})