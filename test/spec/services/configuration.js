'use strict';

describe('Service: Configuration', function () {

  // instantiate service
  var ConfigurationService,
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

  beforeEach(inject(function (_ConfigurationService_, Auth, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    ConfigurationService = _ConfigurationService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should view Configuration', function () {
    $httpBackend.expectGET('/app/configuration/1/configurations').respond(
        {"config": "test"}
    ); 
    var result = ConfigurationService.viewConfiguration(1, function(data){
    }).then(function(value) { 
        expect(value).toEqual({"config": "test"});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

});

describe('Service: Configuration - reject', function () {

  // instantiate service
  var ConfigurationService,
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

  beforeEach(inject(function (_ConfigurationService_, Auth, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    ConfigurationService = _ConfigurationService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should view Configuration', function () {
    $httpBackend.expectGET('/app/configuration/1/configurations').respond(
        401, {"config": "failed"}
    ); 
    var result = ConfigurationService.viewConfiguration(1, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual({"config": "failed"});
    });
    $httpBackend.flush();
    $scope.$apply();
  });

});
