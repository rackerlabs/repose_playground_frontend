'use strict';

describe('Directive: component - init success', function () {

    var $scope,
        $log,
        $compile,
        $modal = {},
        $location,
        componentDirective,
        ReposeServiceMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
            $provide.value('$modal', $modal);
        });

        inject(function (_$compile_, $rootScope, $q, _$log_, _$location_, $templateCache) {
            $q = $q;
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            $location = _$location_;
            $modal = {
                open: jasmine.createSpy('modal.open'),
            }
            ReposeServiceMock.getComponents = function (versionId, componentName) {
                var deferred = $q.defer();
                deferred.resolve(['1', '2', '3']);
                return deferred.promise;
            };
        
            $templateCache.put("views/reposeFilter.html", "<div></div>");
        });
    });

    it('should validate component init', function () {
        $scope.repose = {
            
        }
        var element = angular.element('<component></component>');
        componentDirective = $compile(element)($scope);
        $scope.$digest();
        expect($scope.repose).toEqual({ componentData: [  ], renderedFilters: [  ] });
    });

    it('should create instance when executed - DOES NOT HAVE AN ASSERTION', function () {
        $scope.repose = {
            componentData: ['add_header', 'ip_user']
        };
        $scope.newInstance = {
            selectedFilters: ['add-header', 'ip-user']
        }
        var element = angular.element('<component><form><input type="checkbox" name="test" xsd-type="test2" filter-name="test3"/></form></component>');
        componentDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.createInstance();
    });

    it('should get component when executed', function () {
        $scope.repose = {
            //ignored for now
            renderedFilters: {
                '1.2': ['add_header1', 'ip_user1'],
                '2.2': ['add_header2', 'ip_user2']
            }
        };
        $scope.newInstance = {
            selectedFilters: ['add-header', 'ip-user'],
            version: "1.2.3"
        }
        $scope.ui = {}

        var element = angular.element('<component><form><input type="checkbox" name="test" xsd-type="test2" filter-name="test3"/></form></component>');
        componentDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.getComponent();
        $scope.$apply();
        expect($scope.repose.componentData).toEqual([[ '1', '2', '3' ], [ '1', '2', '3' ] ]);
        expect($scope.repose.renderedFilters["1.2.3"]).toEqual([ 'add-header', 'ip-user' ]);
        expect($scope.repose.version).toBe('1.2.3');
        expect($scope['add_header_data']).toEqual([ '1', '2', '3' ]);
        expect($scope['ip_user_data']).toEqual([ '1', '2', '3' ]);
        expect(componentDirective[0].innerHTML).toBe('<form class="ng-pristine ng-valid ng-scope"><input type="checkbox" name="test" xsd-type="test2" filter-name="test3"></form><repose-filter name="add-header" data="[&quot;1&quot;,&quot;2&quot;,&quot;3&quot;]" class="ng-scope ng-isolate-scope"><div class="ng-scope"></div></repose-filter><repose-filter name="ip-user" data="[&quot;1&quot;,&quot;2&quot;,&quot;3&quot;]" class="ng-scope ng-isolate-scope"><div class="ng-scope"></div></repose-filter>');
    });
});

describe('Directive: component - init failure', function () {

    var $scope,
        $log,
        $compile,
        $modal = {},
        $location,
        componentDirective,
        ReposeServiceMock = {};

    beforeEach(function () {
        module('reposePlaygroundApp');
        module(function ($provide) {
            $provide.value('ReposeService', ReposeServiceMock);
            $provide.value('$modal', $modal);
        });

        inject(function (_$compile_, $rootScope, $q, _$log_, _$location_, $templateCache) {
            $q = $q;
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;
            $location = _$location_;
            $modal = {
                open: jasmine.createSpy('modal.open'),
            }
            ReposeServiceMock.getComponents = function (versionId, componentName) {
                var deferred = $q.defer();
                deferred.reject("Failed");
                return deferred.promise;
            };
        
            $templateCache.put("views/reposeFilter.html", "<div></div>");
        });
    });

    it('should fail to get component when executed', function () {
        $scope.repose = {
            //ignored for now
            renderedFilters: {
                '1.2': ['add_header1', 'ip_user1'],
                '2.2': ['add_header2', 'ip_user2']
            }
        };
        $scope.newInstance = {
            selectedFilters: ['add-header', 'ip-user'],
            version: "1.2.3"
        }
        $scope.ui = {}

        var element = angular.element('<component><form><input type="checkbox" name="test" xsd-type="test2" filter-name="test3"/></form></component>');
        componentDirective = $compile(element)($scope);
        $scope.$digest();
        $scope.getComponent();
        $scope.$apply();
        expect($scope.repose.componentData).toEqual([]);
        expect($scope.ui.componentSelected).toEqual(false);
        expect($scope.repose.availableFilters).toEqual([]);
        expect($scope.newInstance.selectedFilters).toEqual([]);
        expect($scope.ui.errorMessage).toEqual("Failed");
        expect($scope.repose.renderedFilters["1.2.3"]).toBeUndefined();
        expect($scope.repose.version).toBeUndefined();
        expect($scope['add_header_data']).toBeUndefined();
        expect($scope['ip_user_data']).toBeUndefined();
        expect(componentDirective[0].innerHTML).toBe('<form class="ng-pristine ng-valid"><input type="checkbox" name="test" xsd-type="test2" filter-name="test3"></form>');
    });
});
