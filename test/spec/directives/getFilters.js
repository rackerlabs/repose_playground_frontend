'use strict';

describe('Directive: getFilters - init success', function () {

    var $scope,
        $log,
        $compile,
        getFiltersDirective,
        ReposeServiceMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
        });

        inject(function (_$compile_, $rootScope, $q, _$log_, $templateCache) {
            $q = $q;
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            ReposeServiceMock.getFiltersByVersion = function (versionId) {
                var deferred = $q.defer();
                deferred.resolve(['add-header', 'ip-user', 'compression']);
                return deferred.promise;
            };
        
            $templateCache.put("views/getReposeFilters.html", "<div></div>");
        });
    });

    it('should validate getFilters call', function () {
        $scope.newInstance = {
            version: '1.2.3'
        };
        $scope.ui = {
            
        };
        $scope.repose = {
        };
        var element = angular.element('<get-filters></get-filters>');
        getFiltersDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.getFilters();
        $scope.$apply();
        expect($scope.ui.versionSelected).toEqual(true);
        expect($scope.repose.availableFilters).toEqual(['add-header', 'ip-user', 'compression']);
        expect($scope.ui.errorMessage).toEqual("");
    });
});

describe('Directive: getFilters - init failure', function () {

    var $scope,
        $log,
        $compile,
        getFiltersDirective,
        ReposeServiceMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
        });

        inject(function (_$compile_, $rootScope, $q, _$log_, $templateCache) {
            $q = $q;
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            ReposeServiceMock.getFiltersByVersion = function (versionId) {
                var deferred = $q.defer();
                deferred.reject("Failed");
                return deferred.promise;
            };
        
            $templateCache.put("views/getReposeFilters.html", "<div></div>");
        });
    });

    it('should validate getFilters call', function () {
        $scope.newInstance = {
            version: '1.2.3'
        };
        $scope.ui = {
            
        };
        $scope.repose = {
        };
        var element = angular.element('<get-filters></get-filters>');
        getFiltersDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.getFilters();
        $scope.$apply();
        expect($scope.ui.versionSelected).toEqual(false);
        expect($scope.repose.availableFilters).toEqual([]);
        expect($scope.ui.errorMessage).toEqual("This version is not available");
    });
});
