'use strict';

describe('Directive: reposeCards - init success', function () {

    var $scope,
        $log,
        $compile,
        reposeCardsDirective,
        ReposeServiceMock = {},
        modalMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
            $provide.value('$modal', modalMock);
        });

        inject(function (_$compile_, $rootScope, _$log_, _$location_, $q, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            modalMock.open = function(){};
            
            ReposeServiceMock.stopInstance = function (id) {
                var deferred = $q.defer();
                deferred.resolve(true);
                return deferred.promise;
            };
            
            ReposeServiceMock.startInstance = function (id) {
                var deferred = $q.defer();
                deferred.resolve(true);
                return deferred.promise;
            };
            
            spyOn(modalMock, "open").and.callThrough();
            spyOn(ReposeServiceMock, "stopInstance").and.callThrough();
            spyOn(ReposeServiceMock, "startInstance").and.callThrough();

            $templateCache.put("views/reposeCards.html", "<div></div>");
        });
    });

    it('should view configuration', function () {
        var element = angular.element('<repose-cards></repose-cards>');
        reposeCardsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.viewConfiguration({});
        expect(modalMock.open).toHaveBeenCalled();
        expect(modalMock.open.calls.count()).toEqual(1);

    });

    it('should monitor', function () {
        var element = angular.element('<repose-cards></repose-cards>');
        reposeCardsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.monitor({});
        expect(modalMock.open).toHaveBeenCalled();
        expect(modalMock.open.calls.count()).toEqual(1);

    });

    it('should stop', function () {
        var repose = {
            id: 1
        };
        $scope.ui = {
        }
        $scope.reposes = [];
        var element = angular.element('<repose-cards></repose-cards>');
        reposeCardsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.stop(repose);
        $scope.$apply();
        expect(ReposeServiceMock.stopInstance).toHaveBeenCalled();
        expect(ReposeServiceMock.stopInstance.calls.count()).toEqual(1);
        expect($scope.ui.waitingForLoad).toBeFalsy();

    });

    it('should start', function () {
        var repose = {
            id: 1
        };
        $scope.ui = {
        }
        var element = angular.element('<repose-cards></repose-cards>');
        reposeCardsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.start(repose);
        $scope.$apply();
        expect(ReposeServiceMock.startInstance).toHaveBeenCalled();
        expect(ReposeServiceMock.startInstance.calls.count()).toEqual(1);
        expect($scope.ui.waitingForLoad).toBeFalsy();

    });
});

describe('Directive: reposeCards - init failure', function () {

    var $scope,
        $log,
        $compile,
        reposeCardsDirective,
        ReposeServiceMock = {},
        AuthMock,
        modalMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
            $provide.value('Auth', AuthMock);
            $provide.value('$modal', modalMock);
        });

        inject(function (_$compile_, $rootScope, _$log_, _$location_, $q, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            modalMock.open = function(){};
            
            ReposeServiceMock.stopInstance = function (id) {
                var deferred = $q.defer();
                deferred.reject("failed");
                return deferred.promise;
            };
            
            ReposeServiceMock.startInstance = function (id) {
                var deferred = $q.defer();
                deferred.reject("failed");
                return deferred.promise;
            };
            
            spyOn(modalMock, "open").and.callThrough();
            spyOn(ReposeServiceMock, "stopInstance").and.callThrough();
            spyOn(ReposeServiceMock, "startInstance").and.callThrough();

            $templateCache.put("views/reposeCards.html", "<div></div>");
        });
    });

    it('should stop', function () {
        var repose = {
            id: 1
        };
        $scope.ui = {
        }
        var element = angular.element('<repose-cards></repose-cards>');
        reposeCardsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.stop(repose);
        $scope.$apply();
        expect(ReposeServiceMock.stopInstance).toHaveBeenCalled();
        expect(ReposeServiceMock.stopInstance.calls.count()).toEqual(1);
        expect($scope.ui.waitingForLoad).toBeFalsy();
        expect($scope.ui.reposeFetchError).toBeTruthy();

    });

    it('should start', function () {
        var repose = {
            id: 1
        };
        $scope.ui = {
        }
        var element = angular.element('<repose-cards></repose-cards>');
        reposeCardsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.start(repose);
        $scope.$apply();
        expect(ReposeServiceMock.startInstance).toHaveBeenCalled();
        expect(ReposeServiceMock.startInstance.calls.count()).toEqual(1);
        expect($scope.ui.waitingForLoad).toBeFalsy();
        expect($scope.ui.reposeFetchError).toBeTruthy();

    });
});
