'use strict';

describe('Controller: InternalCtrl - init success', function () {

  // load the controller's module
  beforeEach(module('reposePlaygroundApp'));

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    InternalCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    ReposeServiceMock.getInstances = function(states) {
        var deferred = $q.defer();
        deferred.resolve([
            {
                "id": 1,
                "name": "test"
            }
        ]);
        return deferred.promise;
    }
    
    spyOn(ReposeServiceMock, "getInstances").and.callThrough();

    InternalCtrl = $controller('InternalCtrl', {
      $scope: $scope,
      $log: log,
      ReposeService: ReposeServiceMock
    });
  }));

  it('should validate Internal init', function () {
      expect($scope.ui.waitingForLoad).toBe(true);
      expect($scope.ui.reposeFetchError).toBe(false);
      expect($scope.ui.isChildState).toBe(false);
      expect(ReposeServiceMock.getInstances).toHaveBeenCalled();
      expect(ReposeServiceMock.getInstances.calls.count()).toEqual(1);
  });
  
  it('should apply the repose instances once getInstances call returns', function() {
      //apply the promise
      $scope.$apply();
      expect($scope.ui.waitingForLoad).toBe(false);
      expect($scope.ui.reposeFetchError).toBe(false);
      expect($scope.ui.isChildState).toBe(false);
      expect($scope.reposes).toEqual([
            {
                "id": 1,
                "name": "test"
            }
        ]);
  });
});

describe('Controller: InternalCtrl - init failure', function () {

  // load the controller's module
  beforeEach(module('reposePlaygroundApp'));

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    InternalCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    ReposeServiceMock.getInstances = function(states) {
        var deferred = $q.defer();
        deferred.reject("We got an error");
        return deferred.promise;
    }
    
    spyOn(ReposeServiceMock, "getInstances").and.callThrough();

    InternalCtrl = $controller('InternalCtrl', {
      $scope: $scope,
      $log: log,
      ReposeService: ReposeServiceMock
    });
  }));

  it('should validate Internal init', function () {
      expect($scope.ui.waitingForLoad).toBe(true);
      expect($scope.ui.reposeFetchError).toBe(false);
      expect($scope.ui.isChildState).toBe(false);
      expect(ReposeServiceMock.getInstances).toHaveBeenCalled();
      expect(ReposeServiceMock.getInstances.calls.count()).toEqual(1);
  });
  
  it('should apply the repose instances once getInstances call returns', function() {
      //apply the promise
      $scope.$apply();
      expect($scope.ui.waitingForLoad).toBe(false);
      expect($scope.ui.reposeFetchError).toBe(true);
      expect($scope.ui.isChildState).toBe(false);
      expect($scope.reposes).toBeUndefined();
  });
});

describe('Controller: InternalCtrl - force fetch instances - success', function () {

  // load the controller's module
  beforeEach(module('reposePlaygroundApp'));

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    InternalCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    ReposeServiceMock.getInstances = function(states) {
        var deferred = $q.defer();
        deferred.resolve([
            {
                "id": 1,
                "name": "test"
            }
        ]);
        return deferred.promise;
    }
    
    spyOn(ReposeServiceMock, "getInstances").and.callThrough();

    InternalCtrl = $controller('InternalCtrl', {
      $scope: $scope,
      $log: log,
      ReposeService: ReposeServiceMock
    });
  }));
  
  it('should apply the repose instances once getInstances call returns', function() {
      //apply the promise
      $scope.forceFetchInstances();
      $scope.$apply();
      expect($scope.ui.waitingForLoad).toBe(false);
      expect($scope.ui.reposeFetchError).toBe(false);
      expect($scope.ui.isChildState).toBe(false);
      expect($scope.reposes).toEqual([
            {
                "id": 1,
                "name": "test"
            }
        ]);
      expect(ReposeServiceMock.getInstances).toHaveBeenCalled();  
      expect(ReposeServiceMock.getInstances.calls.count()).toEqual(2);
  });
});


describe('Controller: InternalCtrl - force fetch instances - failure', function () {

  // load the controller's module
  beforeEach(module('reposePlaygroundApp'));

  var $controller,
    $scope,
    log,
    ReposeServiceMock = {},
    InternalCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    ReposeServiceMock.getInstances = function(states) {
        var deferred = $q.defer();
        deferred.reject("Errored");
        return deferred.promise;
    }
    
    spyOn(ReposeServiceMock, "getInstances").and.callThrough();

    InternalCtrl = $controller('InternalCtrl', {
      $scope: $scope,
      $log: log,
      ReposeService: ReposeServiceMock
    });
  }));
  
  it('should apply the repose instances once getInstances call returns', function() {
      //apply the promise
      $scope.forceFetchInstances();
      $scope.$apply();
      expect($scope.ui.waitingForLoad).toBe(false);
      expect($scope.ui.reposeFetchError).toBe(true);
      expect($scope.ui.isChildState).toBe(false);
      expect($scope.reposes).toBeUndefined();
      expect(ReposeServiceMock.getInstances).toHaveBeenCalled();  
      expect(ReposeServiceMock.getInstances.calls.count()).toEqual(2);
  });
});
