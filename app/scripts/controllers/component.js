'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
.controller('ComponentInstanceCtrl', function ($scope, $modalInstance, filter, $log) {
    $log.info('inside component modal instance ctrl', filter);
    $scope.filter = filter;
    $scope.filter_name = filter.name;

    $scope.dismiss = function () {
      $log.info("dismissed");
      $modalInstance.dismiss('cancel');
    };
  });
