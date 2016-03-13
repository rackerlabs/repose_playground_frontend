'use strict';

describe('Controller: LoginCtrl - init', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    AuthMock = {},
    $location,
    LoginCtrl,
    form;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _$location_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    $location = _$location_;

    AuthMock.login = function(form) {
        var deferred = $q.defer();
        deferred.resolve("");
        return deferred.promise;
    }

    spyOn(AuthMock, "login").and.callThrough();

    LoginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      Auth: AuthMock,
      $location: $location,
      $log: log
    });
  }));

  it('should validate login init', function () {
      expect($scope.user).toEqual({});
      expect($scope.errors).toEqual({});
  });

  it('valid login should succeed', function () {
      form = {
          $valid: true
      }
      $scope.login(form);
      $scope.$apply();
      expect($location.$$path).toBe('/main');
      expect($scope.user).toEqual({});
      expect($scope.errors).toEqual({});
      expect(AuthMock.login).toHaveBeenCalled();  
      expect(AuthMock.login.calls.count()).toEqual(1);
  });

  it('invalid login should fail', function () {
      form = {
          $valid: false
      }
      $scope.login(form);
      $scope.$apply();
      expect($location.$$path).toBe('/');
      expect($scope.user).toEqual({});
      expect($scope.errors).toEqual({});
      expect(AuthMock.login.calls.count()).toEqual(0);
  });
});

describe('Controller: LoginCtrl - init login fail', function () {

  // load the controller's module
  beforeEach(function() {
      module('reposePlaygroundApp');
  });

  var $controller,
    $scope,
    log,
    AuthMock = {},
    $location,
    LoginCtrl,
    form;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$log_, _$location_, $q) {
    $scope = $rootScope.$new();
    $controller = _$controller_; 
    log = _$log_;
    $location = _$location_;

    AuthMock.login = function(form) {
        var deferred = $q.defer();
        deferred.reject({
            message: 'failed message',
            'user': {
                message: 'failed'
            },
            'another': 'something else'
        });
        return deferred.promise;
    }

    spyOn(AuthMock, "login").and.callThrough();

    LoginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      Auth: AuthMock,
      $location: $location,
      $log: log
    });
  }));

  it('valid login fails', function () {
      form = {
          $valid: true
      }
      $scope.login(form);
      $scope.$apply();
      expect($location.$$path).toBe('/');
      expect($scope.user).toEqual({});
      expect($scope.errors).toEqual({ other: [ 'message => failed message', 'user => failed', 'another => something else' ] });
      expect(AuthMock.login).toHaveBeenCalled();  
      expect(AuthMock.login.calls.count()).toEqual(1);
  });
});