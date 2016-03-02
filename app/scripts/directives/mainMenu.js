'use strict';

angular.module('reposePlaygroundApp')
  .directive('mainMenu', function (Auth, $location, $log) {
    return {
      templateUrl: 'views/mainMenu.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.error(scope, element, attrs);
        scope.logout = function() {
          $log.error('logging out')
          Auth.logout();
          $location.path('/');
        }
      }
    };
  });
