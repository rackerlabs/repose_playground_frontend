'use strict';

describe('Directive: reposeTable - init success', function () {

    var $scope,
        $log,
        $compile,
        reposeTableDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;

            $templateCache.put("views/reposeTable.html", "<div></div>");
        });
    });

    it('should init with no data', function () {
        var element = angular.element('<repose-table filter-name="add-headers" prefix="prefix"></repose-table>');
        reposeTableDirective = $compile(element)($scope);
        $scope.$digest();
        var scope = reposeTableDirective.isolateScope();
        expect(scope.filterName).toEqual("add-headers")
        expect(scope.fields).toEqual([])
        expect(scope.list).toEqual([{}])
        expect(scope.prefix).toEqual("prefix")

    });

    it('should init with invalid data', function () {
        $scope.data = "blah"
        var element = angular.element('<repose-table filter-name="add-headers" prefix="prefix" data="{{ data }}"></repose-table>');
        reposeTableDirective = $compile(element)($scope);
        $scope.$digest();
        var scope = reposeTableDirective.isolateScope();
        expect(scope.filterName).toEqual("add-headers")
        expect(scope.fields).toEqual([])
        expect(scope.list).toEqual([{}])
        expect(scope.prefix).toEqual("prefix")

    });

    it('should init with valid data', function () {
        $scope.data = [
            {
                name: 'test1',
                minInclusive: 0,
                maxInclusive: 1,
                default: 0.5,
                'xsd-type': 'attribute'
            },
            {
                name: 'test2',
                minInclusive: 0,
                maxInclusive: 10,
                default: 5,
                'xsd-type': 'value'
            }
        ]
        var element = angular.element('<repose-table filter-name="add-headers" prefix="prefix" data="{{ data }}"></repose-table>');
        reposeTableDirective = $compile(element)($scope);
        $scope.$digest();
        var scope = reposeTableDirective.isolateScope();
        expect(scope.filterName).toEqual("add-headers")
        expect(scope.fields).toEqual([{ name: 'test1', minInclusive: 0, maxInclusive: 1, default: 0.5, 'xsd-type': 'attribute' }, { name: 'test2', minInclusive: 0, maxInclusive: 10, default: 5, 'xsd-type': 'value' }])
        expect(scope.list).toEqual([{ test1: { name: 'test1', minInclusive: 0, maxInclusive: 1, default: 0.5, 'xsd-type': 'attribute', 'filter-name': 'add-headers' }, test2: { name: 'test2', minInclusive: 0, maxInclusive: 10, default: 5, 'xsd-type': 'value', 'filter-name': 'add-headers' } } ])
        expect(scope.prefix).toEqual("prefix")
    });

    it('should add one to list ', function () {
        
        var element = angular.element('<repose-table filter-name="add-headers" prefix="prefix"></repose-table>');
        reposeTableDirective = $compile(element)($scope);
        $scope.$digest();
        var scope = reposeTableDirective.isolateScope();
        scope.test_data = ['test1']
        scope.addOneToList(scope.test_data)
        expect(scope.test_data.length).toEqual(2)

    });

    it('should remove one from list ', function () {
        var element = angular.element('<repose-table filter-name="add-headers" prefix="prefix"></repose-table>');
        reposeTableDirective = $compile(element)($scope);
        $scope.$digest();
        var scope = reposeTableDirective.isolateScope();
        scope.test_data = ['test1', 'test2']
        scope.removeOneFromList(scope.test_data, 'test1')
        expect(scope.test_data).toContain('test2')
        expect(scope.test_data).not.toContain('test1')

    });
});
