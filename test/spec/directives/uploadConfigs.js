'use strict';

describe('Directive: uploadConfigs - init success', function () {

    var $scope,
        $log,
        $compile,
        modalMock = {},
        uploadConfigsDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('$modal', modalMock);
        });

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;

            modalMock.open = function(){};

            spyOn(modalMock, "open").and.callThrough();

            $templateCache.put("views/uploadConfigs.html", "<div></div>");
        });
    });

    it('should not upload files without a file', function () {
        var element = angular.element('<upload-configs></upload-configs>');
        uploadConfigsDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.uploadFiles();
        expect(modalMock.open).not.toHaveBeenCalled();
        expect(modalMock.open.calls.count()).toEqual(0);

    });

    it('should upload files with a file', function () {
        var element = angular.element('<upload-configs></upload-configs>');
        uploadConfigsDirective = $compile(element)($scope);
        $scope.$digest();
        var scope = uploadConfigsDirective.isolateScope();
        $scope.file = "file";
        $scope.uploadFiles();
        expect(modalMock.open).toHaveBeenCalled();
        expect(modalMock.open.calls.count()).toEqual(1);

    });

});
