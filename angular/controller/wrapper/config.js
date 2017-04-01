app.config(function($stateProvider, $urlRouterProvider,$httpProvider,jwtInterceptorProvider,jwtOptionsProvider){


jwtOptionsProvider.config({ 
      whiteListedDomains: ['http://localhost:3000'  ]
    });
   jwtInterceptorProvider.tokenGetter = function(jwtHelper, $http,options) {
    console.info("options::",JSON.stringify(options));
    var token= sessionStorage.getItem('SessionMessage');
    console.info("token",JSON.stringify(token));
    if(sessionStorage.SessionMessage && sessionStorage.SessionMessage !=undefined && sessionStorage.SessionMessage !=null && sessionStorage.SessionMessage != "undefined")
    {

    var token1= sessionStorage.getItem('SessionMessage').split(" ")[1];
    var jwt = token1;
        if (jwtHelper.isTokenExpired(jwt)) {
      // This is a promise of a JWT id_token
      return $http({
        url: 'http://localhost:3000/api/verifytoken',
        // This will not send the JWT for this call
        skipAuthorization: true,
        method: 'GET',
        
      }).then(function successCallback(response) {
        console.info("response",JSON.stringify(response.data));
        sessionStorage.setItem('SessionMessage', response.data.refreshtoken);
        return jwt;
      },function errorCallback(response)
      {
        return jwt;
      });
    } else {
      return jwt; 
    }
   }
  }
    $httpProvider.interceptors.push('jwtInterceptor');
    $urlRouterProvider.otherwise(function($injector)
      {
        var $state =$injector.get('$state');
        
          if(sessionStorage.SessionMessage && sessionStorage.SessionMessage !=undefined && sessionStorage.SessionMessage !=null && sessionStorage.SessionMessage != "undefined")
        {
          $state.go('dashboard');
        }
        else
        {
          $state.go('login');
        }
      });




// login
      $stateProvider
      .state('login',{
      	url:'/',
      	views:{
      		'template':{
      		templateUrl:'angular/view/login/login.html',
      		controller: 'authCtrl'
      	}
      	}
      	
      })

        .state ('dashboard', {
            url: '/dashboard',
            views: {
              'template': {
                templateUrl: 'angular/view/dashboard.html',
                // controller: 'maincontroller' 
              }
            },
          // authenticate :true 
              resolve :{
              authenticate :function(authFactory){ return   authFactory.isAuthenticated();},
              }
            
           
        })



})