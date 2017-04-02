app.config(function($stateProvider, $urlRouterProvider,$httpProvider){


    $urlRouterProvider.otherwise('/');

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
            }
        })



})


