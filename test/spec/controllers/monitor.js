'use strict';

describe('Controller: MonitorModalInstanceCtrl - init', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    $modalInstance,
    repose,
    FileSaver,
    timeout,
    MonitorModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _FileSaver_, $q, _$timeout_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    FileSaver = _FileSaver_;
    timeout = function(timeoutfun, time){
        //don't do anything here.
    }
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };
    repose = {
        id: '1'
    };
    
    ReposeServiceMock.showStats = function(id) {
        var deferred = $q.defer();
        deferred.resolve(
            {
                "cpuStats": {
                    cpuUsage: {
                        inKernelMode: 1,
                        inUserMode: 2,
                        total: 3
                    },
                    systemUsage: 4    
                },
                "memoryStats": {
                    currentUsage: 1,
                    failCount: 2,
                    maxUsage: 3,
                    limit: 4
                },
                network: {
                    rxBytes: 1,
                    rxPackets: 2,
                    rxPacketsDropped: 3,
                    rxPacketsErrored: 0,
                    txBytes: 1,
                    txPackets: 2,
                    txPacketsDropped: 3,
                    txPacketsErrored: 0
                }
            }
        );
        return deferred.promise;
        
    }

    spyOn(ReposeServiceMock, "showStats").and.callThrough();

    MonitorModalInstanceCtrl = $controller('MonitorModalInstanceCtrl', {
      $scope: $scope,
      ReposeService: ReposeServiceMock,
      $modalInstance: $modalInstance,
      repose: repose,
      FileSaver: FileSaver,
      $timeout: timeout,
      $log: log
    });
  }));

  it('should validate monitor init', function () {
    expect($scope.cpuStats).toEqual({
      inKernelMode: [],
      inUserMode: [],
      total: [],
      systemUsage: []
    });
    expect($scope.memoryData).toEqual({
      currentUsage: [],
      failCount: [],
      maxUsage: [],
      limit: []
    });
    expect($scope.networkData).toEqual({
      rxBytes: [],
      rxPackets: [],
      rxPacketsDropped: [],
      rxPacketsErrored: [],
      txBytes: [],
      txPackets: [],
      txPacketsDropped: [],
      txPacketsErrored: []
    });
    expect($scope.cpuStatsLabels).toEqual([]);
    expect($scope.cpuStatsSeries).toEqual(['Kernel Mode Usage', 'User Mode Usage', 'Total Usage', 'System Usage']);
    expect($scope.memoryStatsLabels).toEqual([]);
    expect($scope.memoryStatsSeries).toEqual(['Current', 'Fail count', 'Max', 'Limit']);
    expect($scope.networkStatsLabels).toEqual([]);
    expect($scope.networkStatsSeries).toEqual(['Rx Bytes', 'Rx Packets', 'Rx Dropped', 'Rx Errored',
                                 'Tx Bytes', 'Tx Packets', 'Tx Dropped', 'Tx Errored']);
    expect($scope.cpuStatsData).toEqual([$scope.cpuStats.inKernelMode, $scope.cpuStats.inUserMode,
                           $scope.cpuStats.total, $scope.cpuStats.systemUsage]);
    expect($scope.memoryStatsData).toEqual([$scope.memoryData.currentUsage, $scope.memoryData.failCount,
                              $scope.memoryData.maxUsage, $scope.memoryData.limit]);
    expect($scope.networkStatsData).toEqual([$scope.networkData.rxBytes, $scope.networkData.rxPackets,
                              $scope.networkData.rxPacketsDropped, $scope.networkData.rxPacketsErrored,
                              $scope.networkData.txBytes, $scope.networkData.txPackets,
                              $scope.networkData.txPacketsDropped, $scope.networkData.txPacketsErrored]);
  });

  it('should validate monitor init with successful state fetch', function () {
    $scope.$apply();
    expect($scope.cpuStats).toEqual({ inKernelMode: [ 1 ], inUserMode: [ 2 ], total: [ 3 ], systemUsage: [ 4 ] });
    expect($scope.memoryData).toEqual({ currentUsage: [ 1 ], failCount: [ 2 ], maxUsage: [ 3 ], limit: [ 4 ] });
    expect($scope.networkData).toEqual({ rxBytes: [ 1 ], rxPackets: [ 2 ], rxPacketsDropped: [ 3 ], rxPacketsErrored: [ 0 ], txBytes: [ 1 ], txPackets: [ 2 ], txPacketsDropped: [ 3 ], txPacketsErrored: [ 0 ] });
    expect($scope.cpuStatsLabels.length).toEqual(1);
    expect($scope.cpuStatsSeries).toEqual(['Kernel Mode Usage', 'User Mode Usage', 'Total Usage', 'System Usage']);
    expect($scope.memoryStatsLabels.length).toEqual(1);
    expect($scope.memoryStatsSeries).toEqual(['Current', 'Fail count', 'Max', 'Limit']);
    expect($scope.networkStatsLabels.length).toEqual(1);
    expect($scope.networkStatsSeries).toEqual(['Rx Bytes', 'Rx Packets', 'Rx Dropped', 'Rx Errored',
                                 'Tx Bytes', 'Tx Packets', 'Tx Dropped', 'Tx Errored']);
    expect($scope.cpuStatsData).toEqual([$scope.cpuStats.inKernelMode, $scope.cpuStats.inUserMode,
                           $scope.cpuStats.total, $scope.cpuStats.systemUsage]);
    expect($scope.memoryStatsData).toEqual([$scope.memoryData.currentUsage, $scope.memoryData.failCount,
                              $scope.memoryData.maxUsage, $scope.memoryData.limit]);
    expect($scope.networkStatsData).toEqual([$scope.networkData.rxBytes, $scope.networkData.rxPackets,
                              $scope.networkData.rxPacketsDropped, $scope.networkData.rxPacketsErrored,
                              $scope.networkData.txBytes, $scope.networkData.txPackets,
                              $scope.networkData.txPacketsDropped, $scope.networkData.txPacketsErrored]);
    expect(ReposeServiceMock.showStats.calls.count()).toEqual(1);
  });
  
  it('should dismiss the modal', function() {
      //apply the promise
      $scope.dismiss();
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect(ReposeServiceMock.showStats.calls.count()).toEqual(1);
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
  });
  
  it('should dismiss the modal', function() {
      //apply the promise
      $scope.ok();
      expect($modalInstance.close).toHaveBeenCalled();
      expect(ReposeServiceMock.showStats.calls.count()).toEqual(1);
      expect($modalInstance.close.calls.count()).toEqual(1);
  });
});

describe('Controller: MonitorModalInstanceCtrl - init undefined response', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    $modalInstance,
    repose,
    FileSaver,
    timeout,
    MonitorModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _FileSaver_, $q, _$timeout_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    FileSaver = _FileSaver_;
    timeout = function(timeoutfun, time){
        //don't do anything here.
    }
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };
    repose = {
        id: '1'
    };
    
    ReposeServiceMock.showStats = function(id) {
        var deferred = $q.defer();
        deferred.resolve(
            {
                
            }
        );
        return deferred.promise;
        
    }

    spyOn(ReposeServiceMock, "showStats").and.callThrough();

    MonitorModalInstanceCtrl = $controller('MonitorModalInstanceCtrl', {
      $scope: $scope,
      ReposeService: ReposeServiceMock,
      $modalInstance: $modalInstance,
      repose: repose,
      FileSaver: FileSaver,
      $timeout: timeout,
      $log: log
    });
  }));

  it('should validate monitor init with empty stats fetch', function () {
    $scope.$apply();
    expect($scope.cpuStats).toEqual({
      inKernelMode: [],
      inUserMode: [],
      total: [],
      systemUsage: []
    });
    expect($scope.memoryData).toEqual({
      currentUsage: [],
      failCount: [],
      maxUsage: [],
      limit: []
    });
    expect($scope.networkData).toEqual({
      rxBytes: [],
      rxPackets: [],
      rxPacketsDropped: [],
      rxPacketsErrored: [],
      txBytes: [],
      txPackets: [],
      txPacketsDropped: [],
      txPacketsErrored: []
    });
    expect($scope.cpuStatsLabels).toEqual([]);
    expect($scope.cpuStatsSeries).toEqual(['Kernel Mode Usage', 'User Mode Usage', 'Total Usage', 'System Usage']);
    expect($scope.memoryStatsLabels).toEqual([]);
    expect($scope.memoryStatsSeries).toEqual(['Current', 'Fail count', 'Max', 'Limit']);
    expect($scope.networkStatsLabels).toEqual([]);
    expect($scope.networkStatsSeries).toEqual(['Rx Bytes', 'Rx Packets', 'Rx Dropped', 'Rx Errored',
                                 'Tx Bytes', 'Tx Packets', 'Tx Dropped', 'Tx Errored']);
    expect($scope.cpuStatsData).toEqual([$scope.cpuStats.inKernelMode, $scope.cpuStats.inUserMode,
                           $scope.cpuStats.total, $scope.cpuStats.systemUsage]);
    expect($scope.memoryStatsData).toEqual([$scope.memoryData.currentUsage, $scope.memoryData.failCount,
                              $scope.memoryData.maxUsage, $scope.memoryData.limit]);
    expect($scope.networkStatsData).toEqual([$scope.networkData.rxBytes, $scope.networkData.rxPackets,
                              $scope.networkData.rxPacketsDropped, $scope.networkData.rxPacketsErrored,
                              $scope.networkData.txBytes, $scope.networkData.txPackets,
                              $scope.networkData.txPacketsDropped, $scope.networkData.txPacketsErrored]);

    expect(ReposeServiceMock.showStats.calls.count()).toEqual(1);
  });
});

describe('Controller: MonitorModalInstanceCtrl - init failed response', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    $modalInstance,
    repose,
    FileSaver,
    timeout,
    MonitorModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _FileSaver_, $q, _$timeout_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    FileSaver = _FileSaver_;
    timeout = function(timeoutfun, time){
        //don't do anything here.
    }
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };
    repose = {
        id: '1'
    };
    
    ReposeServiceMock.showStats = function(id) {
        var deferred = $q.defer();
        deferred.reject("Failed");
        return deferred.promise;
        
    }

    spyOn(ReposeServiceMock, "showStats").and.callThrough();

    MonitorModalInstanceCtrl = $controller('MonitorModalInstanceCtrl', {
      $scope: $scope,
      ReposeService: ReposeServiceMock,
      $modalInstance: $modalInstance,
      repose: repose,
      FileSaver: FileSaver,
      $timeout: timeout,
      $log: log
    });
  }));

  it('should validate monitor init with failed stats fetch', function () {
    $scope.$apply();
    expect($scope.errorMessage).toEqual("Failed");
    expect($scope.cpuStats).toEqual({
      inKernelMode: [],
      inUserMode: [],
      total: [],
      systemUsage: []
    });
    expect($scope.memoryData).toEqual({
      currentUsage: [],
      failCount: [],
      maxUsage: [],
      limit: []
    });
    expect($scope.networkData).toEqual({
      rxBytes: [],
      rxPackets: [],
      rxPacketsDropped: [],
      rxPacketsErrored: [],
      txBytes: [],
      txPackets: [],
      txPacketsDropped: [],
      txPacketsErrored: []
    });
    expect($scope.cpuStatsLabels).toEqual([]);
    expect($scope.cpuStatsSeries).toEqual(['Kernel Mode Usage', 'User Mode Usage', 'Total Usage', 'System Usage']);
    expect($scope.memoryStatsLabels).toEqual([]);
    expect($scope.memoryStatsSeries).toEqual(['Current', 'Fail count', 'Max', 'Limit']);
    expect($scope.networkStatsLabels).toEqual([]);
    expect($scope.networkStatsSeries).toEqual(['Rx Bytes', 'Rx Packets', 'Rx Dropped', 'Rx Errored',
                                 'Tx Bytes', 'Tx Packets', 'Tx Dropped', 'Tx Errored']);
    expect($scope.cpuStatsData).toEqual([$scope.cpuStats.inKernelMode, $scope.cpuStats.inUserMode,
                           $scope.cpuStats.total, $scope.cpuStats.systemUsage]);
    expect($scope.memoryStatsData).toEqual([$scope.memoryData.currentUsage, $scope.memoryData.failCount,
                              $scope.memoryData.maxUsage, $scope.memoryData.limit]);
    expect($scope.networkStatsData).toEqual([$scope.networkData.rxBytes, $scope.networkData.rxPackets,
                              $scope.networkData.rxPacketsDropped, $scope.networkData.rxPacketsErrored,
                              $scope.networkData.txBytes, $scope.networkData.txPackets,
                              $scope.networkData.txPacketsDropped, $scope.networkData.txPacketsErrored]);

    expect(ReposeServiceMock.showStats.calls.count()).toEqual(1);
  });
});