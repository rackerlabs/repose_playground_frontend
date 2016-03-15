'use strict';

describe('Directive: makeRequest - init success', function () {

    var $scope,
        $log,
        $compile,
        makeRequestDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;

            $templateCache.put("views/makeRequest.html", "<div></div>");
        });
    });

    it('should validate init', function () {
        var element = angular.element('<make-request></make-request>');
        makeRequestDirective = $compile(element)($scope);
        $scope.$digest();
        expect($scope.methods).toEqual(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'RANDOM']);
        expect($scope.headers).toEqual([
          {
            name: '',
            value: ''
          }
        ]);
    });

    it('should add one to list', function () {
        var element = angular.element('<make-request></make-request>');
        makeRequestDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.addOneToList();
        expect($scope.methods).toEqual(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'RANDOM']);
        expect($scope.headers).toEqual([
          {
            name: '',
            value: ''
          },{
            name: '',
            value: ''
          }
        ]);
    });

    it('should remove one from list', function () {
        var element = angular.element('<make-request></make-request>');
        makeRequestDirective = $compile(element)($scope);
        $scope.$digest();
        //add 2
        $scope.addOneToList();
        $scope.addOneToList();
        expect($scope.headers.length).toEqual(3);
        $scope.removeOneFromList(2);
        expect($scope.methods).toEqual(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'RANDOM']);
        expect($scope.headers.length).toEqual(2);

    });
});
