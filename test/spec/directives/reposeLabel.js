'use strict';

describe('Directive: reposeLabel - init success', function () {

    var $scope,
        $log,
        $compile,
        reposeLabelDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;

            $templateCache.put("views/reposeLabel.html", "<div></div>");
        });
    });

    it('should init ', function () {
        var element = angular.element('<repose-label value="testval" required="required" doc="this is an amazing doc" reposetitle="testtitle" prefix="prefix"></repose-label>');
        reposeLabelDirective = $compile(element)($scope);
        $scope.$digest();
        expect($scope.value).toEqual("testval")
        expect($scope.required).toEqual("required")
        expect($scope.doc).toEqual("this is an amazing doc")
        expect($scope.reposetitle).toEqual("testtitle")
        expect($scope.prefix).toEqual("prefix")

    });
});
