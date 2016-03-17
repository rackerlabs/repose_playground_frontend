'use strict';

describe('Directive: reposeFilter - init success', function () {

    var $scope,
        $log,
        $compile,
        reposeFilterDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;

            $templateCache.put("views/reposeFilter.html", "<div></div>");
            $templateCache.put("views/reposeLabel.html", "<div></div>");
            $templateCache.put("views/reposeItem.html", "<div></div>");
        });
    });

    it('should init', function () {
        $scope.data = {}
        var element = angular.element('<repose-filter data="{{ data }}"></repose-filter>');
        reposeFilterDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeFilterDirective[0].innerHTML).toEqual('<div class="ng-scope"></div>')

    });

    it('should init with full data set', function () {
        $scope.data = {
            doc: 'awesomedoc',
            name: 'my-name',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'entry'
        }
        var element = angular.element('<repose-filter data="{{ data }}" name="add-headers"></repose-filter>');
        reposeFilterDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeFilterDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label prefix="" value="my-name" doc="awesomedoc" reposetitle="true"><div></div></repose-label><repose-item filter-name="add-headers" prefix="my-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="my-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item></div>')

    });

    it('should init with no data attribute', function () {
        var element = angular.element('<repose-filter></repose-filter>');
        reposeFilterDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeFilterDirective[0].innerHTML).toEqual('<div></div>')

    });

    it('should init with invalid data attribute', function () {
        $scope.data = "blah";
        var element = angular.element('<repose-filter data="{{ data }}"></repose-filter>');
        reposeFilterDirective = $compile(element)($scope);
        expect($scope.$digest).toThrowError(TypeError, 'data is not valid');
        expect(reposeFilterDirective[0].innerHTML).toEqual('<div></div>')
    });

    it('should init with list data set', function () {
        $scope.data = {
            doc: 'awesomedoc',
            name: 'my-name',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'list'
        }
        var element = angular.element('<repose-filter data="{{ data }}" name="add-headers"></repose-filter>');
        reposeFilterDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeFilterDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label prefix="" value="my-name" doc="awesomedoc" reposetitle="true"><div></div></repose-label></div>')

    });
});
