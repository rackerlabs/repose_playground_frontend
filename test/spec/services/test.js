'use strict';

describe('Service: Test', function () {

  // instantiate service
  var TestService,
      $httpBackend,
      $scope;
  
  // load the service's module
  beforeEach(function() {
      module('reposePlaygroundApp');
      module(function ($provide) {
          $provide.factory('User', function() {
              var get = jasmine.createSpy('get').and.callFake(function() {
                return {
                    "name": "current user"
                };
              });
              return {
                  get: get
              };
          });
          $provide.factory('Auth', function() {
              var getToken = jasmine.createSpy('getToken').and.callFake(function() {
                return "fake token";
              });
              return {
                  getToken: getToken
              };
          });
    });
  });

  beforeEach(inject(function (_TestService_, Auth, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    TestService = _TestService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should make request', function () {
    $httpBackend.expectPOST('/app/test/1').respond(
        {"result": "awesome"}
    ); 
    var result = TestService.makeRequest(1, function(data){
    }).then(function(value) { 
        expect(value).toEqual({"result": "awesome"});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error making request', function () {
    $httpBackend.expectPOST('/app/test/1').respond(
        401, "failed"
    ); 
    var result = TestService.makeRequest(1, {}, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

});

describe('Service: Test - reject', function () {

  // instantiate service
  var TestService,
      $httpBackend,
      $scope,
      $location;
  
  // load the service's module
  beforeEach(function() {
      module('reposePlaygroundApp');
      module(function ($provide) {
          $provide.factory('User', function() {
              var get = jasmine.createSpy('get').and.callFake(function() {
                return {
                    "name": "current user"
                };
              });
              return {
                  get: get
              };
          });
          $provide.factory('Auth', function() {
              var getToken = jasmine.createSpy('getToken').and.callFake(function() {
                return null;
              });
              var logout = jasmine.createSpy('logout').and.callFake(function() {
                
              });
              return {
                  getToken: getToken,
                  logout: logout
              };
          });
    });
  });

  beforeEach(inject(function (_TestService_, Auth, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    TestService = _TestService_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
  }));

  it('should log out', function () {
    expect(TestService).toBeDefined();
  });
});