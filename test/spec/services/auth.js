'use strict';

describe('Service: Auth', function () {

  // instantiate service
  var Auth,
      $cookieStore,
      UserMock,
      $httpBackend,
      $scope,
      deferred;
  
  // load the service's module
  beforeEach(function() {
      module('reposePlaygroundApp');
      module(function ($provide) {
          $provide.factory('User', function($q) {
              var get = jasmine.createSpy('get').and.callFake(function() {
                deferred = $q.defer();
                deferred.resolve([
                    {
                        "id": 1,
                        "name": "test"
                    }
                ]);
                return {
                    "$promise": deferred.promise,
                    "name": "current user",
                    "role": "admin"
                };
              });
              return {
                  get: get
              };
          });
          $provide.decorator ('$cookieStore', function ($delegate) {
                // at this point the "$cookieStore" service  has only just 
                // been constructed, and is accessible here as "$delegate".
                // Services that have "$cookieStore" as an injected
                // dependency have not been instantiated yet, so we
                // can slip our cookie in now.
                $delegate.put ('token', 'test');
                return $delegate;
            });
        });
  });

  beforeEach(inject(function (_Auth_, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    Auth = _Auth_;
    UserMock = User;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
  }));

  it('should login', function () {
    expect($cookieStore.get('token')).toEqual('test');
    $httpBackend.expectPOST('app/auth').respond(
        {"token": "newtoken"}
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toEqual('newtoken');
  });

  it('should not login', function () {
    expect($cookieStore.get('token')).toEqual('test');
    $httpBackend.expectPOST('app/auth').respond(
        401, "failed"
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should logout', function () {
    expect($cookieStore.get('token')).toEqual('test');
    Auth.logout(); 
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should get current user', function () {
    expect($cookieStore.get('token')).toEqual('test');
    var currentUser = Auth.getCurrentUser(); 
    expect(currentUser.name).toEqual('current user');
  });

  it('should check if logged in', function () {
    expect($cookieStore.get('token')).toEqual('test');
    var isLoggedIn = Auth.isLoggedIn(); 
    expect(isLoggedIn).toBeTruthy();
  });

  it('should check if logged in asynchronously', function () {
    var result = null;
    expect($cookieStore.get('token')).toEqual('test');
    expect(result).toBeNull();
    $scope.$digest();
    expect(result).toBeNull();
    var isLoggedIn = Auth.isLoggedInAsync(function(data){
        result = data;
    }); 
    expect(result).toBeNull();
    $scope.$apply();
    expect(result).toBeTruthy();
  });

  it('should check if is admin', function () {
    var isAdmin = Auth.isAdmin(); 
    expect(isAdmin).toBeTruthy();
  });

  it('should get token', function () {
    var token = Auth.getToken(); 
    expect(token).toEqual('test');
  });

  afterEach(function() {
      $cookieStore.remove ('token');
  });
});

describe('Service: Auth - no token', function () {

  // instantiate service
  var Auth,
      $cookieStore,
      UserMock,
      $httpBackend,
      $scope,
      deferred;

  // load the service's module
  beforeEach(function() {
      module('reposePlaygroundApp');
      module(function ($provide) {
          $provide.factory('User', function($q) {
              var get = jasmine.createSpy('get').and.callFake(function() {
                deferred = $q.defer();
                deferred.resolve([
                    {
                        "id": 1,
                        "name": "test"
                    }
                ]);
                return {
                    "$promise": deferred.promise,
                    "name": "current user"
                };
              });
              return {
                  get: get
              };
          });
        });
  });

  beforeEach(inject(function (_Auth_, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, $q, _$log_) {
    $scope = $rootScope.$new();
    Auth = _Auth_;
    UserMock = User;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
    $q = $q;
  }));

  it('should login', function () {
    expect($cookieStore.get('token')).toBeUndefined();
    $httpBackend.expectPOST('app/auth').respond(
        {"token": "newtoken"}
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toEqual('newtoken');
  });

  it('should not login', function () {
    expect($cookieStore.get('token')).toBeUndefined();
    $httpBackend.expectPOST('app/auth').respond(
        401, "failed"
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should logout', function () {
    expect($cookieStore.get('token')).toBeUndefined();
    Auth.logout(); 
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should get current user', function () {
    expect($cookieStore.get('token')).toBeUndefined();
    var currentUser = Auth.getCurrentUser(); 
    expect(currentUser.name).toBeUndefined();
  });

  it('should check if logged in', function () {
    expect($cookieStore.get('token')).toBeUndefined();
    var isLoggedIn = Auth.isLoggedIn(); 
    expect(isLoggedIn).toBeFalsy();
  });

  it('should check if logged in asynchronously', function () {
    var result = null;
    expect($cookieStore.get('token')).toBeUndefined();
    expect(result).toBeNull();
    $scope.$digest();
    expect(result).toBeNull();
    Auth.isLoggedInAsync(function(data){
        result = data;
    }); 
    expect(result).toBeFalsy();
  });

  it('should check if is admin', function () {
    var isAdmin = Auth.isAdmin(); 
    expect(isAdmin).toBeFalsy();
  });

  it('should get token', function () {
    var token = Auth.getToken(); 
    expect(token).toBeUndefined();
  });

  afterEach(function() {
      $cookieStore.remove ('token');
  });
});

describe('Service: Auth - promise rejected', function () {

  // instantiate service
  var Auth,
      $cookieStore,
      UserMock,
      $httpBackend,
      $scope,
      deferred;
  
  // load the service's module
  beforeEach(function() {
      module('reposePlaygroundApp');
      module(function ($provide) {
          $provide.factory('User', function($q) {
              var get = jasmine.createSpy('get').and.callFake(function() {
                deferred = $q.defer();
                deferred.reject("Everything failed");
                return {
                    "$promise": deferred.promise,
                    "name": "current user",
                    "role": "admin"
                };
              });
              return {
                  get: get
              };
          });
          $provide.decorator ('$cookieStore', function ($delegate) {
                // at this point the "$cookieStore" service  has only just 
                // been constructed, and is accessible here as "$delegate".
                // Services that have "$cookieStore" as an injected
                // dependency have not been instantiated yet, so we
                // can slip our cookie in now.
                $delegate.put ('token', 'test');
                return $delegate;
            });
        });
  });

  beforeEach(inject(function (_Auth_, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    Auth = _Auth_;
    UserMock = User;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
  }));

  it('should login', function () {
    expect($cookieStore.get('token')).toEqual('test');
    $httpBackend.expectPOST('app/auth').respond(
        {"token": "newtoken"}
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toEqual('newtoken');
  });

  it('should not login', function () {
    expect($cookieStore.get('token')).toEqual('test');
    $httpBackend.expectPOST('app/auth').respond(
        401, "failed"
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should logout', function () {
    expect($cookieStore.get('token')).toEqual('test');
    Auth.logout(); 
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should get current user', function () {
    expect($cookieStore.get('token')).toEqual('test');
    var currentUser = Auth.getCurrentUser(); 
    expect(currentUser.name).toEqual('current user');
  });

  it('should check if logged in', function () {
    expect($cookieStore.get('token')).toEqual('test');
    var isLoggedIn = Auth.isLoggedIn(); 
    expect(isLoggedIn).toBeTruthy();
  });

  it('should check if logged in asynchronously', function () {
    var result = null;
    expect($cookieStore.get('token')).toEqual('test');
    expect(result).toBeNull();
    $scope.$digest();
    expect(result).toBeNull();
    Auth.isLoggedInAsync(function(data){
        result = data;
    }); 
    expect(result).toBeNull();
    $scope.$apply();
    expect(result).toBeFalsy();
  });

  it('should check if is admin', function () {
    var isAdmin = Auth.isAdmin(); 
    expect(isAdmin).toBeTruthy();
  });

  it('should get token', function () {
    var token = Auth.getToken(); 
    expect(token).toEqual('test');
  });

  afterEach(function() {
      $cookieStore.remove ('token');
  });
});


describe('Service: Auth - no promise property', function () {

  // instantiate service
  var Auth,
      $cookieStore,
      UserMock,
      $httpBackend,
      $scope,
      deferred;
  
  // load the service's module
  beforeEach(function() {
      module('reposePlaygroundApp');
      module(function ($provide) {
          $provide.factory('User', function() {
              var get = jasmine.createSpy('get').and.callFake(function() {
                return {
                    "name": "current user",
                    "role": "admin"
                };
              });
              return {
                  get: get
              };
          });
          $provide.decorator ('$cookieStore', function ($delegate) {
                // at this point the "$cookieStore" service  has only just 
                // been constructed, and is accessible here as "$delegate".
                // Services that have "$cookieStore" as an injected
                // dependency have not been instantiated yet, so we
                // can slip our cookie in now.
                $delegate.put ('token', 'test');
                return $delegate;
            });
        });
  });

  beforeEach(inject(function (_Auth_, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    Auth = _Auth_;
    UserMock = User;
    $cookieStore = _$cookieStore_;
    $httpBackend = _$httpBackend_;
  }));

  it('should login', function () {
    expect($cookieStore.get('token')).toEqual('test');
    $httpBackend.expectPOST('app/auth').respond(
        {"token": "newtoken"}
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toEqual('newtoken');
  });

  it('should not login', function () {
    expect($cookieStore.get('token')).toEqual('test');
    $httpBackend.expectPOST('app/auth').respond(
        401, "failed"
    ); 
    Auth.login({}, null); 
    $httpBackend.flush();
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should logout', function () {
    expect($cookieStore.get('token')).toEqual('test');
    Auth.logout(); 
    expect($cookieStore.get('token')).toBeUndefined();
  });

  it('should get current user', function () {
    expect($cookieStore.get('token')).toEqual('test');
    var currentUser = Auth.getCurrentUser(); 
    expect(currentUser.name).toEqual('current user');
  });

  it('should check if logged in', function () {
    expect($cookieStore.get('token')).toEqual('test');
    var isLoggedIn = Auth.isLoggedIn(); 
    expect(isLoggedIn).toBeTruthy();
  });

  it('should check if logged in asynchronously', function () {
    var result = null;
    expect($cookieStore.get('token')).toEqual('test');
    expect(result).toBeNull();
    $scope.$digest();
    expect(result).toBeNull();
    Auth.isLoggedInAsync(function(data){
        result = data;
    });
    //based on a role 
    expect(result).toBeTruthy();
  });

  it('should check if is admin', function () {
    var isAdmin = Auth.isAdmin(); 
    expect(isAdmin).toBeTruthy();
  });

  it('should get token', function () {
    var token = Auth.getToken(); 
    expect(token).toEqual('test');
  });

  afterEach(function() {
      $cookieStore.remove ('token');
  });
});
