'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
.controller('ConfigModalInstanceCtrl', function (ConfigurationService, $scope, $modalInstance, repose, FileSaver, $log) {
    $log.info('inside config modal instance ctrl', repose);
    $scope.configsLoading = true;
    $scope.configsLoaded = false;
    $scope.configsErrored = false;

    ConfigurationService.viewConfiguration(repose.id)
    .then(function(data){
      $scope.configs = data;
      $scope.configsLoading = false;
      $scope.configsLoaded = true;
      $scope.configsErrored = false;
    })
    .catch(function(err){
      $scope.configsLoading = false;
      $scope.configsLoaded = false;
      $scope.configsErrored = true;
      $scope.errorMessage = err;
      $log.error('ReposeCards ConfigurationService.viewConfiguration::Got an error: ', err);

    });

    $scope.dismiss = function () {
      $log.info("dismissed");
      $modalInstance.dismiss('cancel');
    };

    $scope.download = function () {
      $log.info("download called");
      $modalInstance.dismiss('cancel');
      var zip = new JSZip();
      var reposeFolder = zip.folder("repose");
      angular.forEach($scope.configs, function(config){
        reposeFolder.file(config.name, config.xml);
      });

      var blob = zip.generate({type:"blob"});
      FileSaver.saveAs(blob, "repose.zip");
    };
  });
