'use strict';

describe('Controller: CreateCtrl - init', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    $filter,
    CreateCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _$filter_) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    $filter = _$filter_;

    CreateCtrl = $controller('CreateCtrl', {
      $scope: $scope,
      $log: log,
      $filter: $filter
    });
  }));

  it('should validate create init', function () {
      expect($scope.ui.waitingForLoad).toBe(false);
      expect($scope.ui.reposeFetchError).toBe(false);
      expect($scope.ui.isChildState).toBe(true);
      expect($scope.ui.versionSelected).toBe(false);
      expect($scope.ui.componentSelected).toBe(false);
      expect($scope.repose.availableVersions).toEqual([]);
      expect($scope.repose.availableFilters).toEqual([]);
  });
});

describe('Controller: UploadModalInstanceCtrl - init success', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    location,
    $modalInstance,
    file = {},
    newInstance = {},
    UploadMock = {},
    UploadModalInstanceCtrl;
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$location_, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    location = _$location_;
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

    newInstance.version = 1;

    UploadMock.upload = function(data) {
        var deferred = $q.defer();
        deferred.resolve({
            "data": {
                "message": "success",
                "id": 1
            },
            "config":{
                "data": {
                    "file": {
                        "name": "config file name"
                    }
                }
            }
        });
        return deferred.promise;
    }
    
    spyOn(UploadMock, "upload").and.callThrough();

    UploadModalInstanceCtrl = $controller('UploadModalInstanceCtrl', {
      Upload: UploadMock,
      $scope: $scope,
      $modalInstance: $modalInstance,
      file: file,
      newInstance: newInstance,
      $log: log,
      $location: location
    });
  }));

  it('should validate upload init', function () {
      expect($scope.status).toBe("building");
      expect($scope.isUploading).toBe(true);
      expect($scope.progressPercentage).toBe(0);
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
  });

  it('should validate upload once upload is successful', function () {
      $scope.$apply();
      expect($scope.status).toBe("success");
      expect($scope.isUploading).toBe(true);
      expect($scope.reposeId).toBe(1);
      expect($scope.progressPercentage).toBe(0);
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
  });

  it('should close modal on success', function () {
      $scope.$apply();
      $scope.ok();
      expect($scope.status).toBe("success");
      expect($scope.isUploading).toBe(true);
      expect($scope.reposeId).toBe(1);
      expect($scope.progressPercentage).toBe(0);
      expect(location.$$path).toBe("/test/1");
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
      expect($modalInstance.close).toHaveBeenCalled();
      expect($modalInstance.close.calls.count()).toEqual(1);
  });

  it('should cancel modal on success', function () {
      $scope.$apply();
      $scope.cancel();
      expect($scope.status).toBe("success");
      expect($scope.isUploading).toBe(true);
      expect($scope.reposeId).toBe(1);
      expect($scope.progressPercentage).toBe(0);
      expect(location.$$path).toBe("/");
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
  });
});

describe('Controller: UploadModalInstanceCtrl - init failure', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    location,
    $modalInstance,
    file = {},
    newInstance = {},
    UploadMock = {},
    UploadModalInstanceCtrl;
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$location_, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    location = _$location_;
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

    newInstance.version = 1;

    UploadMock.upload = function(data) {
        var deferred = $q.defer();
        deferred.reject("failure");
        return deferred.promise;
    }
    
    spyOn(UploadMock, "upload").and.callThrough();

    UploadModalInstanceCtrl = $controller('UploadModalInstanceCtrl', {
      Upload: UploadMock,
      $scope: $scope,
      $modalInstance: $modalInstance,
      file: file,
      newInstance: newInstance,
      $log: log,
      $location: location
    });
  }));

  it('should validate upload init', function () {
      expect($scope.status).toBe("building");
      expect($scope.isUploading).toBe(true);
      expect($scope.progressPercentage).toBe(0);
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
  });

  it('should validate upload once upload failed', function () {
      $scope.$apply();
      expect($scope.status).toBe("error");
      expect($scope.isUploading).toBe(true);
      expect($scope.reposeId).toBeUndefined();
      expect($scope.progressPercentage).toBe(0);
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
  });

  it('should close modal on failure', function () {
      $scope.$apply();
      $scope.ok();
      expect($scope.status).toBe("error");
      expect($scope.isUploading).toBe(true);
      expect($scope.reposeId).toBeUndefined();
      expect($scope.progressPercentage).toBe(0);
      expect(location.$$path).toBe("/");
      expect(UploadMock.upload).toHaveBeenCalled();
      expect(UploadMock.upload.calls.count()).toEqual(1);
      expect($modalInstance.close).toHaveBeenCalled();
      expect($modalInstance.close.calls.count()).toEqual(1);
  });
});

describe('Controller: ModalInstanceCtrl - init success', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    location,
    $modalInstance,
    data = {},
    newInstance = {},
    ReposeServiceMock = {},
    ModalInstanceCtrl;
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$location_, _$log_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    location = _$location_;
    
    $modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

    newInstance.version = 1;

    ReposeServiceMock.createInstance = function(version, data) {
        var deferred = $q.defer();
        deferred.resolve({
            "message": "success",
            "id": 1
        });
        return deferred.promise;
    }
    
    spyOn(ReposeServiceMock, "createInstance").and.callThrough();

    ModalInstanceCtrl = $controller('ModalInstanceCtrl', {
      ReposeService: ReposeServiceMock,
      $scope: $scope,
      $modalInstance: $modalInstance,
      data: data,
      newInstance: newInstance,
      $log: log,
      $location: location
    });
  }));

  it('should validate create init', function () {
      expect($scope.status).toBe("building");
      expect($scope.isUploading).toBe(false);
      expect(ReposeServiceMock.createInstance).toHaveBeenCalled();
      expect(ReposeServiceMock.createInstance.calls.count()).toEqual(1);
  });

  it('should validate create once create is successful', function () {
      $scope.$apply();
      expect($scope.status).toBe("success");
      expect($scope.isUploading).toBe(false);
      expect($scope.reposeId).toBe(1);
      expect(ReposeServiceMock.createInstance).toHaveBeenCalled();
      expect(ReposeServiceMock.createInstance.calls.count()).toEqual(1);
  });

  it('should close modal on success', function () {
      $scope.$apply();
      $scope.ok();
      expect($scope.status).toBe("success");
      expect($scope.isUploading).toBe(false);
      expect($scope.reposeId).toBe(1);
      expect(ReposeServiceMock.createInstance).toHaveBeenCalled();
      expect(ReposeServiceMock.createInstance.calls.count()).toEqual(1);
      expect(location.$$path).toBe("/test/1");
      expect($modalInstance.close).toHaveBeenCalled();
      expect($modalInstance.close.calls.count()).toEqual(1);
  });

  it('should cancel modal on success', function () {
      $scope.$apply();
      $scope.cancel();
      expect($scope.status).toBe("success");
      expect($scope.isUploading).toBe(false);
      expect($scope.reposeId).toBe(1);
      expect(ReposeServiceMock.createInstance).toHaveBeenCalled();
      expect(ReposeServiceMock.createInstance.calls.count()).toEqual(1);
      expect(location.$$path).toBe("/");
      expect($modalInstance.dismiss).toHaveBeenCalled();
      expect($modalInstance.dismiss.calls.count()).toEqual(1);
  });
});