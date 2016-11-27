angular.module('app').run(['$rootScope', '$route', '$window', function($rootScope, $route, $window) {
    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
      $rootScope.title = $route.current.title;
    }); 
  
    $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
    }, false);
}])
