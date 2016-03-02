'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.ReposeService
 * @description
 * # Auth
 * Service in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('ConfigurationService', function ReposeService($location, Auth, User, $rootScope, $http, $q, $log) {
    $log.info('In ConfigurationService factory');

    var currentUser = {};
    $log.info('ConfigurationService::Check token in cookie store: ', Auth.getToken())
    if(Auth.getToken()) {
      $log.info('ConfigurationService::We have a token', Auth.getToken());
      currentUser = User.get();
    }

    return {

     /**
      * View repose configurations in xml
      *
      * @param {Object} reposeId - reposeId
      * @param {Function} callback - optional
      * @return {Promise}
      */
     viewConfiguration: function(reposeId, callback) {
       $log.info('In ConfigurationService.viewConfiguration().  Try to get configs for: ', reposeId);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.get('/app/configuration/' + reposeId + '/configurations').
       success(function(resp){
         $log.info('ConfigurationService.viewConfiguration()::Got back a "successful" response with: ', resp);
         deferred.resolve(resp)
         return cb();
       }).
       error(function(err) {
        $log.error('ConfigurationService.viewConfiguration()::Got back a "failed" response with: ', err);
        deferred.reject(err);
        return cb(err);
      }.bind(this));

       return deferred.promise;
     }
    };
  });
