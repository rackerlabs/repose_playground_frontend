'use strict';

describe('Controller: ConfigModalInstanceCtrl - init success', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    $modalInstance,
    repose,
    FileSaver,
    ConfigurationServiceMock = {},
    ConfigModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q, _FileSaver_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    FileSaver = _FileSaver_;
    ConfigurationServiceMock.viewConfiguration = function(reposeId) {
        var deferred = $q.defer();
        deferred.resolve([
            {
                "id": 1,
                "name": "test"
            }
        ]);
        return deferred.promise;
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

    spyOn(ConfigurationServiceMock, "viewConfiguration").and.callThrough();

    ConfigModalInstanceCtrl = $controller('ConfigModalInstanceCtrl', {
      ConfigurationService: ConfigurationServiceMock,
      $scope: $scope,
      $modalInstance: $modalInstance,
      repose: repose,
      FileSaver: FileSaver,
      $log: log
    });
  }));

  it('should validate Configuration init', function () {
      expect($scope.configsLoaded).toBe(false);
      expect($scope.configsLoading).toBe(true);
      expect($scope.configsErrored).toBe(false);
      expect(ConfigurationServiceMock.viewConfiguration).toHaveBeenCalled();
      expect(ConfigurationServiceMock.viewConfiguration.calls.count()).toEqual(1);
  });
  
  it('should apply the repose instances once getInstances call returns', function() {
      //apply the promise
      $scope.$apply();
      expect($scope.configsLoaded).toBe(true);
      expect($scope.configsLoading).toBe(false);
      expect($scope.configsErrored).toBe(false);
      expect($scope.configs).toEqual([
            {
                "id": 1,
                "name": "test"
            }
        ]);
  });
});

describe('Controller: ConfigModalInstanceCtrl - init failure', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    $modalInstance,
    repose,
    FileSaver,
    ConfigurationServiceMock = {},
    ConfigModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q, _FileSaver_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    FileSaver = _FileSaver_;
    ConfigurationServiceMock.viewConfiguration = function(reposeId) {
        var deferred = $q.defer();
        deferred.reject("Errored");
        return deferred.promise;
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

    spyOn(ConfigurationServiceMock, "viewConfiguration").and.callThrough();

    ConfigModalInstanceCtrl = $controller('ConfigModalInstanceCtrl', {
      ConfigurationService: ConfigurationServiceMock,
      $scope: $scope,
      $modalInstance: $modalInstance,
      repose: repose,
      FileSaver: FileSaver,
      $log: log
    });
  }));

  it('should validate Configuration init', function () {
      expect($scope.configsLoaded).toBe(false);
      expect($scope.configsLoading).toBe(true);
      expect($scope.configsErrored).toBe(false);
      expect(ConfigurationServiceMock.viewConfiguration).toHaveBeenCalled();
      expect(ConfigurationServiceMock.viewConfiguration.calls.count()).toEqual(1);
  });
  
  it('should apply the repose configs once viewConfigurations call returns', function() {
      //apply the promise
      $scope.$apply();
      expect($scope.configsLoaded).toBe(false);
      expect($scope.configsLoading).toBe(false);
      expect($scope.configsErrored).toBe(true);
      expect($scope.configs).toBeUndefined();
      expect($scope.errorMessage).toEqual("Errored");
  });
});

describe('Controller: ConfigModalInstanceCtrl - actions', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    $modalInstance,
    repose,
    FileSaver,
    ConfigurationServiceMock = {},
    ConfigModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    ConfigurationServiceMock.viewConfiguration = function(reposeId) {
        var deferred = $q.defer();
        deferred.resolve([
            {
                "id": 1,
                "name": "test"
            }
        ]);
        return deferred.promise;
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
    
    FileSaver = {
        saveAs: jasmine.createSpy('FileSave.saveAs')
    }

    spyOn(ConfigurationServiceMock, "viewConfiguration").and.callThrough();

    ConfigModalInstanceCtrl = $controller('ConfigModalInstanceCtrl', {
      ConfigurationService: ConfigurationServiceMock,
      $scope: $scope,
      $modalInstance: $modalInstance,
      repose: repose,
      FileSaver: FileSaver,
      $log: log
    });
  }));
  
  it('should dismiss the modal', function() {
      //apply the promise
      $scope.$apply();
      expect($scope.configsLoaded).toBe(true);
      expect($scope.configsLoading).toBe(false);
      expect($scope.configsErrored).toBe(false);
      expect($scope.configs).toEqual([
            {
                "id": 1,
                "name": "test"
            }
        ]);
      $scope.dismiss();
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect(ConfigurationServiceMock.viewConfiguration.calls.count()).toEqual(1);
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
  });
  
  it('should download the modal', function() {
      //apply the promise
      $scope.$apply();
      expect($scope.configsLoaded).toBe(true);
      expect($scope.configsLoading).toBe(false);
      expect($scope.configsErrored).toBe(false);
      expect($scope.configs).toEqual([
            {
                "id": 1,
                "name": "test"
            }
        ]);
      $scope.download();
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect(FileSaver.saveAs).toHaveBeenCalled();
      expect(ConfigurationServiceMock.viewConfiguration.calls.count()).toEqual(1);
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
      expect(FileSaver.saveAs.calls.count()).toEqual(1);
  });
});