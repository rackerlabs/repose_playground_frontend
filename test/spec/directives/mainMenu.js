'use strict';

describe('Directive: mainMenu - init success', function () {

    var $scope,
        $log,
        $compile,
        $location,
        mainMenuDirective,
        AuthMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('Auth', AuthMock);
        });

        inject(function (_$compile_, $rootScope, _$log_, _$location_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            $location = _$location_;
            AuthMock.logout = function(){};
            
            spyOn(AuthMock, "logout").and.callThrough();

            $templateCache.put("views/mainMenu.html", "<div></div>");
        });
    });

    it('should validate logout call', function () {
        $scope.newInstance = {
            version: '1.2.3'
        };
        $scope.ui = {
            
        };
        $scope.repose = {
        };
        var element = angular.element('<main-menu></main-menu>');
        mainMenuDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.logout();
        $scope.$apply();
        expect($location.$$path).toEqual("/");
        expect(AuthMock.logout).toHaveBeenCalled();
        expect(AuthMock.logout.calls.count()).toEqual(1);
    });
});
