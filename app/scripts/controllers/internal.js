'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('InternalCtrl', function ($scope, $log, ReposeService) {
    $log.info('In Internal Ctrl');
    $scope.ui = {
      waitingForLoad: true,
      reposeFetchError: false,
      isChildState: false
    };
    ReposeService.getInstances({
      uiStates: $scope.ui
    })
    .then(function(reposes){
      $scope.ui.waitingForLoad = false;
      $scope.reposes = reposes;
      $log.info('InternalCtrl ReposeService.getInstances::got back repose instances: ', reposes);
    })
    .catch(function(err){
      $scope.ui.waitingForLoad = false;
      $scope.ui.reposeFetchError = true;
      $log.error('InternalCtrl ReposeService.getInstances::Got an error: ', err);

    });

    $scope.forceFetchInstances = function(){
      $scope.ui.waitingForLoad = true;
      $scope.ui.reposeFetchError = false;
      ReposeService.getInstances({
        uiStates: $scope.ui
      })
      .then(function(reposes){
        $scope.ui.waitingForLoad = false;
        $scope.ui.reposeFetchError = false;
        $scope.reposes = reposes;
        $log.info('InternalCtrl ReposeService.getInstances::got back repose instances: ', reposes);
      })
      .catch(function(err){
        $scope.ui.waitingForLoad = false;
        $scope.ui.reposeFetchError = true;
        $log.error('InternalCtrl ReposeService.getInstances::Got an error: ', err);

      });
    }


  });
  