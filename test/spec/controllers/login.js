/*'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(function(){
      module(function($provide){
      $provide.factory('Auth', [
          '$location', 'Auth', 'User', '$rootScope', '$http', '$q', '$log', 
          function($location, Auth, User, $rootScope, $http, $q, $log){
              function getInstances(data){
                return [
                  {
                      "id": 1,
                      "name": "test1"
                  }  
                ];
            }

            return {
                getInstances: getInstances
            };
      }]);
    });
      module('reposePlaygroundApp');
  });

  var LoginCtrl,
    scope,
    location,
    Auth,
    log;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_, _Auth_, _$location_, _$log_) {
    scope = _$rootScope_.$new();
    log = _$log_;
    location = _$location_;
    Auth = _Auth_;
    LoginCtrl = _$controller_('LoginCtrl', {
      $scope: scope,
      Auth: _Auth_,
      $location: location,
      $log: log
      // place here mocked dependencies
    });
  }));

  it('should validate Login init', function () {
    expect(LoginCtrl).toBeDefined();
    console.log('Test this out', LoginCtrl, scope);
    expect(scope.user).toBeDefined();
    expect(scope.errors).toBeDefined();
  });
});
*/