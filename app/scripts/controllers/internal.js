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


  })
  .controller('MonitorModalInstanceCtrl', function (ReposeService, $scope, $modalInstance, repose, FileSaver, $log, $timeout) {
    $log.info('inside monitor modal instance ctrl', repose);
    $scope.configsLoading = true;
    $scope.configsLoaded = false;
    $scope.configsErrored = false;
    $scope.cpuStats = {
      inKernelMode: [],
      inUserMode: [],
      total: [],
      systemUsage: []
    };
    $scope.memoryData = {
      currentUsage: [],
      failCount: [],
      maxUsage: [],
      limit: []
    };
    $scope.networkData = {
      rxBytes: [],
      rxPackets: [],
      rxPacketsDropped: [],
      rxPacketsErrored: [],
      txBytes: [],
      txPackets: [],
      txPacketsDropped: [],
      txPacketsErrored: []
    };
    $scope.cpuStatsLabels = [];
    $scope.cpuStatsSeries = ['Kernel Mode Usage', 'User Mode Usage', 'Total Usage', 'System Usage'];
    $scope.memoryStatsLabels = [];
    $scope.memoryStatsSeries = ['Current', 'Fail count', 'Max', 'Limit'];
    $scope.networkStatsLabels = [];
    $scope.networkStatsSeries = ['Rx Bytes', 'Rx Packets', 'Rx Dropped', 'Rx Errored',
                                 'Tx Bytes', 'Tx Packets', 'Tx Dropped', 'Tx Errored'];
    $scope.cpuStatsData = [$scope.cpuStats.inKernelMode, $scope.cpuStats.inUserMode,
                           $scope.cpuStats.total, $scope.cpuStats.systemUsage]
    $scope.memoryStatsData = [$scope.memoryData.currentUsage, $scope.memoryData.failCount,
                              $scope.memoryData.maxUsage, $scope.memoryData.limit]
    $scope.networkStatsData =[$scope.networkData.rxBytes, $scope.networkData.rxPackets,
                              $scope.networkData.rxPacketsDropped, $scope.networkData.rxPacketsErrored,
                              $scope.networkData.txBytes, $scope.networkData.txPackets,
                              $scope.networkData.txPacketsDropped, $scope.networkData.txPacketsErrored]

    var poller = function() {
      ReposeService.showStats(repose.id)
      .then(function(data){
        //cpu
        if(data.cpuStats !== undefined){
          $scope.cpuStatsLabels.push(new Date());
          $scope.cpuStats.inKernelMode.push(data.cpuStats.cpuUsage.inKernelMode);
          $scope.cpuStats.inUserMode.push(data.cpuStats.cpuUsage.inUserMode);
          $scope.cpuStats.total.push(data.cpuStats.cpuUsage.total);
          $scope.cpuStats.systemUsage.push(data.cpuStats.systemUsage);
        }
        //memory
        if(data.memoryStats !== undefined) {
          $scope.memoryStatsLabels.push(new Date());
          $scope.memoryData.currentUsage.push(data.memoryStats.currentUsage);
          $scope.memoryData.failCount.push(data.memoryStats.failCount);
          $scope.memoryData.maxUsage.push(data.memoryStats.maxUsage);
          $scope.memoryData.limit.push(data.memoryStats.limit);
        }
        //network
        if(data.network !== undefined) {
          $scope.networkStatsLabels.push(new Date());
          $scope.networkData.rxBytes.push(data.network.rxBytes);
          $scope.networkData.rxPackets.push(data.network.rxPackets);
          $scope.networkData.rxPacketsDropped.push(data.network.rxPacketsDropped);
          $scope.networkData.rxPacketsErrored.push(data.network.rxPacketsErrored);
          $scope.networkData.txBytes.push(data.network.txBytes);
          $scope.networkData.txPackets.push(data.network.txPackets);
          $scope.networkData.txPacketsDropped.push(data.network.txPacketsDropped);
          $scope.networkData.txPacketsErrored.push(data.network.txPacketsErrored);
        }

        $timeout(poller, 5000);
      })
      .catch(function(err){
        $scope.errorMessage = err;
        $log.error('ReposeCards ReposeService.viewConfiguration::Got an error: ', err);

      });
    };
    poller();



    $scope.ok = function () {
      $modalInstance.close($scope.status);
    };

    $scope.dismiss = function () {
      $log.info("dismissed");
      $modalInstance.dismiss('cancel');
    };
  })
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
      $scope.configs = data.configs;
      $scope.configsLoading = false;
      $scope.configsLoaded = false;
      $scope.configsErrored = true;
      scope.errorMessage = err;
      $log.error('ReposeCards ConfigurationService.viewConfiguration::Got an error: ', err);

    });

    $scope.ok = function () {
      $modalInstance.close($scope.status);
    };

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
