var baseUrl = "http://localhost:3000/api";


app.factory('authFactory', function($http,$q,$rootScope, $state, $location, $window,redirectToUrlAfterLogin){
	return{

  	isAuthenticated:function()
   {           
         if(sessionStorage.SessionMessage && sessionStorage.SessionMessage !=undefined && sessionStorage.SessionMessage !=null && sessionStorage.SessionMessage != "undefined")
        {     
              return true;
        }
        else
          {
          	   // used to store url before login
               redirectToUrlAfterLogin.url=$location.path();
              return  $q.reject("UNAUTHORIZED");
          }
        console.log("isAuthenticated get::"+JSON.stringify(get));
       return get;





   }, 
	}
})