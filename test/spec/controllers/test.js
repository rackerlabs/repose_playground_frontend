'use strict';

describe('Controller: TestCtrl - init', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    modal = {},
    $filter,
    stateParams = {
        repose_id: 1
    },
    TestServiceMock = {},
    TestCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _$filter_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    $filter = _$filter_;

    TestCtrl = $controller('TestCtrl', {
      $scope: $scope,
      $log: log,
      $modal: modal,
      $filter: $filter,
      $stateParams: stateParams,
      TestService: TestServiceMock
    });
  }));

  it('should validate test init', function () {
      expect($scope.id).toBe(1);
      expect($scope.responses).toEqual([]);
      expect($scope.requestLoading).toBe(false);
      expect($scope.requestLoaded).toBe(true);
      expect($scope.requestErrored).toBe(false);
  });
});

describe('Controller: TestCtrl - testReposeInstance success', function () {
  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    modal = {},
    $filter,
    stateParams = {
        repose_id: 1
    },
    TestServiceMock = {},
    TestCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _$filter_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    $filter = _$filter_;
    
    TestServiceMock.makeRequest = function(id, request){
        var deferred = $q.defer();
        deferred.resolve(
            {
                "id": 1,
                "name": "test"
            }
        );
        return deferred.promise;
        
    }
    
    modal = {                    // Create a mock object using spies
        open: jasmine.createSpy('modal.open')
      };


    spyOn(TestServiceMock, "makeRequest").and.callThrough();

    TestCtrl = $controller('TestCtrl', {
      $scope: $scope,
      $log: log,
      $modal: modal,
      $filter: $filter,
      $stateParams: stateParams,
      TestService: TestServiceMock
    });
  }));

  it('should test testReposeInstance', function () {
      $scope.testReposeInstance();
      $scope.$apply();
      expect($scope.id).toBe(1);
      expect($scope.responses).toEqual([{
                "id": 1,
                "name": "test"
            }]);
      expect($scope.requestLoading).toBe(false);
      expect($scope.requestLoaded).toBe(true);
      expect($scope.requestErrored).toBe(false);
      expect(TestServiceMock.makeRequest).toHaveBeenCalled();
      expect(TestServiceMock.makeRequest.calls.count()).toEqual(1);
  });

  it('should test showIntraFilter', function () {
      $scope.showIntraFilter({});
      $scope.$apply();
      expect($scope.id).toBe(1);
      expect($scope.responses).toEqual([]);
      expect($scope.requestLoading).toBe(false);
      expect($scope.requestLoaded).toBe(true);
      expect($scope.requestErrored).toBe(false);
      expect(modal.open).toHaveBeenCalled();
      expect(modal.open.calls.count()).toEqual(1);
  });

  it('should test showHttp', function () {
      $scope.showHttp({});
      $scope.$apply();
      expect($scope.id).toBe(1);
      expect($scope.responses).toEqual([]);
      expect($scope.requestLoading).toBe(false);
      expect($scope.requestLoaded).toBe(true);
      expect($scope.requestErrored).toBe(false);
      expect(modal.open).toHaveBeenCalled();
      expect(modal.open.calls.count()).toEqual(1);
  });
  
  it('should test showErrors', function () {
      $scope.showErrors({});
      $scope.$apply();
      expect($scope.id).toBe(1);
      expect($scope.responses).toEqual([]);
      expect($scope.requestLoading).toBe(false);
      expect($scope.requestLoaded).toBe(true);
      expect($scope.requestErrored).toBe(false);
      expect(modal.open).toHaveBeenCalled();
      expect(modal.open.calls.count()).toEqual(1);
  });
});

describe('Controller: TestCtrl - testReposeInstance failure', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    modal = {},
    $filter,
    stateParams = {
        repose_id: 1
    },
    TestServiceMock = {},
    TestCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _$filter_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    $filter = _$filter_;
    
    TestServiceMock.makeRequest = function(id, request){
        var deferred = $q.defer();
        deferred.reject("Failed");
        return deferred.promise;
        
    }

    spyOn(TestServiceMock, "makeRequest").and.callThrough();

    TestCtrl = $controller('TestCtrl', {
      $scope: $scope,
      $log: log,
      $modal: modal,
      $filter: $filter,
      $stateParams: stateParams,
      TestService: TestServiceMock
    });
  }));

  it('should test testReposeInstance', function () {
      $scope.testReposeInstance();
      $scope.$apply();
      expect($scope.id).toBe(1);
      expect($scope.responses).toEqual([]);
      expect($scope.errorMessage).toEqual("Failed");
      expect($scope.requestLoading).toBe(false);
      expect($scope.requestLoaded).toBe(false);
      expect($scope.requestErrored).toBe(true);
      
  });
});

describe('Controller: IntraFilterModalInstanceCtrl - init', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    $modalInstance = {},
    $filters = {
        filter: 1
    },
    IntraFilterModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

    IntraFilterModalInstanceCtrl = $controller('IntraFilterModalInstanceCtrl', {
      $scope: $scope,
      $log: log,
      $modalInstance: $modalInstance,
      filters: $filters
    });
  }));

  it('should validate instance filter modal init', function () {
      expect($scope.filters).toEqual({
          filter: 1
        });
  });
  
  it('should validate instance filter modal dismiss', function () {
      $scope.dismiss();
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
  });
});

describe('Controller: LogModalInstanceCtrl - init', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    $modalInstance = {},
    data = {
        data: 1
    },
    header = {
        header: 1
    },
    LogModalInstanceCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

    LogModalInstanceCtrl = $controller('LogModalInstanceCtrl', {
      $scope: $scope,
      $log: log,
      $modalInstance: $modalInstance,
      data: data,
      header: header
    });
  }));

  it('should validate log modal init', function () {
      expect($scope.data).toEqual({
          data: 1
        });
      expect($scope.header).toEqual({
          header: 1
        });
  });
  
  it('should validate log modal dismiss', function () {
      $scope.dismiss();
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
  });
});
