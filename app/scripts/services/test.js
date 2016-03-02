'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.ReposeService
 * @description
 * # Auth
 * Service in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('TestService', function ReposeService($location, Auth, User, $rootScope, $http, $q, $log) {
    $log.info('In TestService factory');

    var currentUser = {};
    $log.info('TestService::Check token in cookie store: ', Auth.getToken())
    if(Auth.getToken()) {
      $log.info('TestService::We have a token', Auth.getToken());
      currentUser = User.get();
    }

    return {

    makeRequest: function(id, data, callback) {
       $log.info('In TestService.makeRequest().  Try to insert for: ', id, data);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.post('/app/test/' + id, data).
       success(function(resp){
         $log.info('TestService.makeRequest()::Got back a "successful" response with: ', resp);
         deferred.resolve(resp)
         return cb();
       }).
       error(function(err) {
        $log.error('TestService.makeRequest()::Got back a "failed" response with: ', err);
        deferred.reject(err);
        return cb(err);
      }.bind(this));

       return deferred.promise;
     }
    };
  });
