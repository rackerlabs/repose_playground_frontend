'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.ReposeService
 * @description
 * # Auth
 * Service in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('ReposeService', function ReposeService($location, Auth, User, $rootScope, $http, $q, $log) {
    $log.info('In ReposeService factory');

    var currentUser = {};
    $log.info('ReposeService::Check token in cookie store: ', Auth.getToken())
    if(Auth.getToken()) {
      $log.info('ReposeService::We have a token', Auth.getToken());
      currentUser = User.get();
    }

    return {

      /**
       * Retrieve all repose instances for this user
       *
       * @param  {Object}   uiStates     - uiStates
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getInstances: function(uiStates, callback) {
        $log.info('In ReposeService.getInstances().  Try to retrieve for: ', currentUser);
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        if(currentUser === undefined) {
              this.logout();
              deferred.reject('ReposeService.getInstances()::Not logged in');
              return cb('ReposeService.getInstances()::Not logged in');
        }

        $http.get('app/repose/list').
        success(function(data) {
          $log.info('ReposeService.getInstances()::Got back a "successful" response with: ', data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          $log.error('ReposeService.getInstances()::Got back a "failed" response with: ', err);
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Retrieve all repose versions
       *
       * @return {Promise}
       */
      getVersions: function(callback) {
        $log.info('In ReposeService.getVersions().  Try to retrieve');
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('app/versions').
        success(function(data) {
          $log.info('ReposeService.getVersions()::Got back a "successful" response with: ', data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          $log.error('ReposeService.getVersions()::Got back a "failed" response with: ', err);
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Retrieve all repose filters for a version
       *
       * @param  {Object}   versionId     - versionId
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getFiltersByVersion: function(versionId, callback) {
       $log.info('In ReposeService.getFiltersByVersion().  Try to retrieve for: ', versionId);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.get('app/versions/' + versionId + '/components').
       success(function(data) {
         $log.info('ReposeService.getFiltersByVersion()::Got back a "successful" response with: ', data);
         deferred.resolve(data);
         return cb();
       }).
       error(function(err) {
         $log.error('ReposeService.getFiltersByVersion()::Got back a "failed" response with: ', err);
         deferred.reject(err);
         return cb(err);
       }.bind(this));

       return deferred.promise;
     },

      /**
       * Retrieve repose component by component name and version id
       *
       * @param  {Object}   versionId     - versionId
       * @param  {Object}   componentName - componentName
       * @param  {Function} callback - optional
       * @return {Promise}
       */
     getComponents: function(versionId, componentName, callback){
       $log.info('In ReposeService.getComponents().  Try to retrieve for: ', versionId, componentName);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.get('/app/versions/' + versionId + '/components/' + componentName).
       success(function(data) {
         $log.info('ReposeService.getComponents()::Got back a "successful" response with: ', data);
         deferred.resolve(data);
         return cb();
       }).
       error(function(err) {
         $log.error('ReposeService.getComponents()::Got back a "failed" response with: ', err);
         deferred.reject(err);
         return cb(err);
       }.bind(this));

       return deferred.promise;
     },

     /**
      * Create new repose instance based on specified version and data
      *
      * @param {Object} versionId - versionId
      * @param {Object} data - json representation of entered values
      * @param {Function} callback - optional
      * @return {Promise}
      */
     createInstance: function(versionId, data, callback) {
       $log.info('In ReposeService.createInstance().  Try to insert for: ', versionId, data);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.post('/app/versions/' + versionId, data).
       success(function(resp){
         $log.info('ReposeService.createInstance()::Got back a "successful" response with: ', resp);
         deferred.resolve(resp)
         return cb();
       }).
       error(function(err) {
        $log.error('ReposeService.createInstance()::Got back a "failed" response with: ', err);
        deferred.reject(err);
        return cb(err);
      }.bind(this));

       return deferred.promise;
     },

     stopInstance: function(id, callback) {
      $log.info('In ReposeService.stopInstance().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/repose/stop/' + id).
      success(function(resp){
        $log.info('ReposeService.stopInstance()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.stopInstance()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },

    startInstance: function(id, callback) {
     $log.info('In ReposeService.startInstance().  Try to start: ', id);
     var cb = callback || angular.noop;
     var deferred = $q.defer();

     $http.get('/app/repose/start/' + id).
     success(function(resp){
       $log.info('ReposeService.startInstance()::Got back a "successful" response with: ', resp);
       deferred.resolve(resp)
       return cb();
     }).
     error(function(err) {
      $log.error('ReposeService.startInstance()::Got back a "failed" response with: ', err);
      deferred.reject(err);
      return cb(err);
    }.bind(this));

     return deferred.promise;
   },

    showStats: function(id, callback) {
     $log.info('In ReposeService.showStats().  Try to show stats for: ', id);
     var cb = callback || angular.noop;
     var deferred = $q.defer();

     $http.get('/app/repose/stats/' + id).
     success(function(resp){
       $log.info('ReposeService.showStats()::Got back a "successful" response with: ', resp);
       deferred.resolve(resp)
       return cb();
     }).
     error(function(err) {
      $log.error('ReposeService.showStats()::Got back a "failed" response with: ', err);
      deferred.reject(err);
      return cb(err);
    }.bind(this));

     return deferred.promise;
   }
    };
  });
