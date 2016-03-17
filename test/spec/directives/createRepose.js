'use strict';

describe('Directive: createRepose - init success', function () {

    var $scope,
        $log,
        $compile,
        createReposeDirective,
        ReposeServiceMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
            //$provide.value('$log', $log);
        });

        inject(function (_$compile_, $rootScope, $q, _$log_, $templateCache) {
            $q = $q;
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            ReposeServiceMock.getVersions = function () {
                var deferred = $q.defer();
                deferred.resolve(['1', '2', '3']);
                return deferred.promise;
            };
        
            $templateCache.put("views/createRepose.html", "<div></div>");
        });
    });

    it('should validate createRepose init', function () {
        var element = angular.element('<create-repose></create-repose>');
        createReposeDirective = $compile(element)($scope);
        $scope.repose = {
            availableVersions: []
        }
        $scope.ui = {};
        $scope.$digest();
        expect($scope.ui).toEqual({ VersionSelected: false, errorMessage: '' });
        expect($scope.repose.availableVersions).toEqual(['1', '2', '3']);
    });
    
    it('should select version when asked', function() {
        var element = angular.element('<create-repose></create-repose>');
        createReposeDirective = $compile(element)($scope);
        $scope.repose = {
            availableVersions: []
        }
        $scope.ui = {};
        $scope.$digest();
        expect($scope.ui).toEqual({ VersionSelected: false, errorMessage: '' });
        expect($scope.repose.availableVersions).toEqual(['1', '2', '3']);
        $scope.selectVersion();
        expect($scope.ui).toEqual({ VersionSelected: true, errorMessage: '' });
    });

});

describe('Directive: createRepose - init failure', function () {

    var $controller,
        $scope,
        $log,
        $compile,
        createReposeDirective,
        ReposeServiceMock = {},
        $templateCache;

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
            //$provide.value('$log', $log);
        });

        inject(function (_$compile_, $rootScope, $q, _$log_, $templateCache) {
            $q = $q;
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            ReposeServiceMock.getVersions = function () {
                var deferred = $q.defer();
                deferred.reject("Failed");
                return deferred.promise;
            };
        
            $templateCache.put("views/createRepose.html", "<div></div>");
        });
    });

    it('should validate createRepose init', function () {
        var element = angular.element('<create-repose></create-repose>');
        createReposeDirective = $compile(element)($scope);
        $scope.repose = {
            availableVersions: []
        }
        $scope.ui = {};
        $scope.$digest();
        expect($scope.ui).toEqual({ VersionSelected: false, reposeFetchError: true, errorMessage: 'Failed' });
        expect($scope.repose.availableVersions).toEqual([]);
    });

});
