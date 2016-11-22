angular.module('app').run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
      $rootScope.title = $route.current.title;
    });    
}])
