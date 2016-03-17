'use strict';

angular.module('reposePlaygroundApp')
  .directive('makeRequest', function ($log) {
    return {
      templateUrl: 'views/makeRequest.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.info('In makeRequest directive: ', scope, element, attrs);
        scope.methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'RANDOM'];
        scope.headers = [
          {
            name: '',
            value: ''
          }
        ];


        scope.addOneToList = function() {
          $log.info('makeRequest::addOneToList')
          scope.headers.push({
            name: '',
            value: ''
          })
          
          $log.info('makeRequest::addOneToList')
        }

        scope.removeOneFromList = function(index) {
          $log.info('makeRequest::removeOneFromList', scope.headers, index)
          scope.headers.splice(index, 1);
          $log.info('makeRequest::removeOneFromList', scope.headers, index)
        }

      }
    };
  });
