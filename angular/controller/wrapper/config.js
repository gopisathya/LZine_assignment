app.config(function($stateProvider, $urlRouterProvider,$httpProvider){



     $urlRouterProvider.otherwise(function($injector) {
         var $state = $injector.get('$state');
         // var $rootScope=$injector.get('$rootScope');
         if (localStorage.SessionMessage && localStorage.SessionMessage != undefined && localStorage.SessionMessage != null && localStorage.SessionMessage != "undefined") {
             $state.go('dashboard');
         } else {
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
      // dashboard
        .state ('dashboard', {
            url: '/dashboard',
            views: {
              'template': {
                templateUrl: 'angular/view/dashboard.html',
                controller: 'authCtrl' 
              }
            },
            
        })



})





