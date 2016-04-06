'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('CreateCtrl', function ($scope, $log, $modal) {
    $log.info('In Create Ctrl');
    $scope.ui = {
      waitingForLoad: false,
      reposeFetchError: false,
      isChildState: true,
      versionSelected: false,
      componentSelected: false
    };
    $scope.repose = {
      availableVersions: [],
      availableFilters: [],
      renderedFilters: []
    };
    $scope.newInstance = {
      selectedFilters: []
    };
    
    $scope.createInstance = function() {
        $log.error('create instance', $scope.repose.renderedFilters);
        $modal.open({
            templateUrl: '/views/create_file_modal.html',
            backdrop: 'static',
            controller: 'ModalInstanceCtrl',
            resolve: {
                data: function () {
                    return $scope.repose.renderedFilters;
                },
                newInstance: function () {
                    return $scope.newInstance;
                },
                isUploading: function () {
                    return false;
                }
            }
        });
    }
  })
  .controller('ModalInstanceCtrl', function (ReposeService, $scope, $modalInstance, data, newInstance, $log, $location) {
    $log.info('inside modal instance ctrl', newInstance, data);
    $scope.status = "building";
    $scope.isUploading = false;
    ReposeService.createInstance(newInstance.version, data)
    .then(function(result){
      $log.info('ModalInstanceCtrl::',result);
      $scope.status = result.message;
      $scope.reposeId = result.id;
    })
    .catch(function(err){
      $log.error('ModalInstanceCtrl::',err);
      $scope.status = 'error';
    });

    $scope.ok = function () {
      $log.info("get ok", $scope.status, $scope.reposeId)
      $modalInstance.close();
      if($scope.status === "success") {
        $location.path("/test/" + $scope.reposeId);
      }
    };


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('UploadModalInstanceCtrl', function (Upload, $scope, $modalInstance, file, newInstance, $log, $location) {
    $log.info('inside modal instance ctrl', newInstance, file);
    $scope.status = "building";
    $scope.isUploading = true;
    $scope.progressPercentage = 0;
    Upload.upload({
        url: 'app/configuration/' + newInstance.version + '/upload',
        data: {file: file}
    }).then(function (resp) {
        $scope.status = resp.data.message;
        $scope.reposeId = resp.data.id;
        $log.info('Success ', resp.config.data.file.name, 'uploaded. Response: ', resp);
    }, function (resp) {
        $log.log('Error status: ' + resp.status);
        $scope.status = 'error';
    }, function (evt) {
        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $log.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
    });

    $scope.ok = function () {
      $log.info("get ok", $scope.status, $scope.reposeId)
      $modalInstance.close();
      if($scope.status === "success") {
        $location.path("/test/" + $scope.reposeId);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
