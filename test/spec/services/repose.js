'use strict';

describe('Service: Repose - success', function () {

  // instantiate service
  var ReposeService,
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
                return "fake token";
              });
              return {
                  getToken: getToken
              };
          });
    });
  });

  beforeEach(inject(function (_ReposeService_, Auth, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    ReposeService = _ReposeService_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
  }));

  it('should get instances', function () {
    $httpBackend.expectGET('app/repose/list').respond(
        [{"repose": 1},{"repose": 2}]
    ); 
    var result = ReposeService.getInstances({}, function(data){
    }).then(function(value) { 
        expect(value).toEqual([{"repose": 1},{"repose": 2}]);
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error getting instances', function () {
    $httpBackend.expectGET('app/repose/list').respond(
        401, "failed"
    ); 
    var result = ReposeService.getInstances({}, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should get versions', function () {
    $httpBackend.expectGET('app/versions').respond(
        [1,2,3,4]
    ); 
    var result = ReposeService.getVersions(function(data){
    }).then(function(value) { 
        expect(value).toEqual([1,2,3,4]);
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error getting versions', function () {
    $httpBackend.expectGET('app/versions').respond(
        401, "failed"
    ); 
    var result = ReposeService.getVersions(function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should get filters by version', function () {
    $httpBackend.expectGET('app/versions/1/components').respond(
        ['add-header', 'ip-user']
    ); 
    var result = ReposeService.getFiltersByVersion(1,function(data){
    }).then(function(value) { 
        expect(value).toEqual(['add-header', 'ip-user']);
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error getting filters by version', function () {
    $httpBackend.expectGET('app/versions/1/components').respond(
        401, "failed"
    ); 
    var result = ReposeService.getFiltersByVersion(1, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should get components', function () {
    $httpBackend.expectGET('/app/versions/1/components/add-header').respond(
        {'message': 'success'}
    ); 
    var result = ReposeService.getComponents(1, 'add-header', function(data){
    }).then(function(value) { 
        expect(value).toEqual({'message': 'success'});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error getting components', function () {
    $httpBackend.expectGET('/app/versions/1/components/add-header').respond(
        401, "failed"
    ); 
    var result = ReposeService.getComponents(1, 'add-header', function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should create instance', function () {
    $httpBackend.expectPOST('/app/versions/1').respond(
        {'message': 'success'}
    ); 
    var result = ReposeService.createInstance(1, {}, function(data){
    }).then(function(value) { 
        expect(value).toEqual({'message': 'success'});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error creating instance', function () {
    $httpBackend.expectPOST('/app/versions/1').respond(
        401, "failed"
    ); 
    var result = ReposeService.createInstance(1, {}, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should stop instance', function () {
    $httpBackend.expectGET('/app/repose/stop/1').respond(
        {'message': 'success'}
    ); 
    var result = ReposeService.stopInstance(1, function(data){
    }).then(function(value) { 
        expect(value).toEqual({'message': 'success'});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error stopping instance', function () {
    $httpBackend.expectGET('/app/repose/stop/1').respond(
        401, "failed"
    ); 
    var result = ReposeService.stopInstance(1, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should start instance', function () {
    $httpBackend.expectGET('/app/repose/start/1').respond(
        {'message': 'success'}
    ); 
    var result = ReposeService.startInstance(1, function(data){
    }).then(function(value) { 
        expect(value).toEqual({'message': 'success'});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error starting instance', function () {
    $httpBackend.expectGET('/app/repose/start/1').respond(
        401, "failed"
    ); 
    var result = ReposeService.startInstance(1, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });
  
  it('should show stats', function () {
    $httpBackend.expectGET('/app/repose/stats/1').respond(
        {'message': 'success'}
    ); 
    var result = ReposeService.showStats(1, function(data){
    }).then(function(value) { 
        expect(value).toEqual({'message': 'success'});
    }).catch(function (err) {
        fail(err);
    });
    $httpBackend.flush();
    $scope.$apply();
  });

  it('should error showing stats', function () {
    $httpBackend.expectGET('/app/repose/stats/1').respond(
        401, "failed"
    ); 
    var result = ReposeService.showStats(1, function(data){
    }).then(function(value) { 
        fail(err);
    }).catch(function (err) {
        expect(err).toEqual("failed");
    });
    $httpBackend.flush();
    $scope.$apply();
  });
});

describe('Service: Repose - reject', function () {

  // instantiate service
  var ReposeService,
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

  beforeEach(inject(function (_ReposeService_, Auth, User, $rootScope, _$location_, _$cookieStore_, _$httpBackend_, _$log_) {
    $scope = $rootScope.$new();
    ReposeService = _ReposeService_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
  }));

  it('should log out', function () {
    expect(ReposeService).toBeDefined();
  });
});