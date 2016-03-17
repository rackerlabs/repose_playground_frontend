'use strict';

describe('Directive: selectConfigOption - init success', function () {

    var $scope,
        $log,
        $compile,
        selectConfigOptionDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            
            $scope.getFilters = function() {};

            $templateCache.put("views/selectConfigOption.html", "<div></div>");
        });
    });

    it('should select config option with build', function () {
        var element = angular.element('<select-config-option></select-config-option>');
        selectConfigOptionDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.newInstance = {
            configOption: 'build'
        };
        $scope.ui = {}
        $scope.selectConfigOption();
        expect($scope.ui.BuildOwnReposeSelected).toBeTruthy();
        expect($scope.ui.UploadConfigsSelected).toBeFalsy();

    });

    it('should select config option without build', function () {
        $scope.newInstance = {
            configOption: 'notbuild'
        };
        $scope.ui = {}
        var element = angular.element('<select-config-option></select-config-option>');
        selectConfigOptionDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.selectConfigOption();
        expect($scope.ui.BuildOwnReposeSelected).toBeFalsy();
        expect($scope.ui.UploadConfigsSelected).toBeTruthy();

    });

});
