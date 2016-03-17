'use strict';

describe('Directive: reposeItem - init success', function () {

    var $scope,
        $log,
        $compile,
        reposeItemDirective;

    beforeEach(function () {
        module('reposePlaygroundApp');

        inject(function (_$compile_, $rootScope, _$log_, $templateCache) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $log = _$log_;

            $templateCache.put("views/reposeItem.html", "<div></div>");
            $templateCache.put("views/reposeLabel.html", "<div></div>");
            $templateCache.put("views/reposeTable.html", "<div></div>");
        });
    });

    it('should init', function () {
        $scope.data = {}
        var element = angular.element('<repose-item data="{{ data }}"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"></div>')

    });

    it('should init with string data set', function () {
        $scope.data = {
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            doc: 'awesomedoc',
            name: 'my-name',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'string'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><input filter-name="add-headers" name="prefixmy-name" type="text" xsd-type="string" value="this is coming from repose item.  should be different"></div>')

    });

    it('should init with anyURI data set', function () {
        $scope.data = {
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            doc: 'awesomedoc',
            name: 'my-name',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'anyURI'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><input filter-name="add-headers" xsd-type="anyURI" type="url" name="prefixmy-name value=" this="" is="" coming="" from="" repose="" item.="" should="" be="" different"=""></div>')

    });

    it('should init with boolean data set', function () {
        $scope.data = {
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            doc: 'awesomedoc',
            name: 'my-name',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'boolean'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item></div>')

    });

    it('should init with double data set', function () {
        $scope.data = {
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            doc: 'awesomedoc',
            name: 'my-name',
            minInclusive: 0,
            maxInclusive: 1.0,
            default: 0.4,
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'double'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        //expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><div filter-name="add-headers" name="prefixmy-name" xsd-type="double" ng-model="element.name" min="0" step="0.1" max="1" value="0.4" class="ng-isolate-scope ng-empty ng-valid" aria-invalid="false"><div class="slider slider-horizontal" id="" style="width: 100%;"><div class="slider-track"><div class="slider-track-low" style="left: 0px; width: 0%;"></div><div class="slider-selection" style="left: 0%; width: 0%;"></div><div class="slider-track-high" style="right: 0px; width: 100%;"></div><div class="slider-handle min-slider-handle round" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" tabindex="0" style="left: 0%;"></div><div class="slider-handle max-slider-handle round hide" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" tabindex="0" style="left: 0%;"></div></div><div class="tooltip tooltip-main top" role="presentation" style="left: 0%; margin-left: 0px;"><div class="tooltip-arrow"></div><div class="tooltip-inner">0</div></div><div class="tooltip tooltip-min top" role="presentation"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div class="tooltip tooltip-max top" role="presentation"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div><input class="slider-input" type="text" style="width: 100%; display: none;" data-value="0" value="0" name="prefixmy-name" filter-name="0"></div></div>')

        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><div filter-name="add-headers" name="prefixmy-name" xsd-type="double" ng-model="element.name" min="0" step="0.1" max="1" value="0.4" class="ng-isolate-scope ng-empty ng-valid" aria-invalid="false"><div class="slider slider-horizontal" id="" style="width: 100%;"><div class="slider-track"><div class="slider-track-low" style="left: 0px; width: 0%;"></div><div class="slider-selection" style="left: 0%; width: 0%;"></div><div class="slider-track-high" style="right: 0px; width: 100%;"></div><div class="slider-handle min-slider-handle round" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" tabindex="0" style="left: 0%;"></div><div class="slider-handle max-slider-handle round hide" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" tabindex="0" style="left: 0%;"></div></div><div class="tooltip tooltip-main top" role="presentation" style="left: 0%; margin-left: 0px;"><div class="tooltip-arrow"></div><div class="tooltip-inner">0</div></div><div class="tooltip tooltip-min top" role="presentation"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div class="tooltip tooltip-max top" role="presentation"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div><input class="slider-input" type="text" style="width: 100%; display: none;" data-value="0" value="0"></div></div>')

    });

    it('should init with radio data set', function () {
        $scope.data = {
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            doc: 'awesomedoc',
            name: 'my-name',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'radio'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><label prefix="prefixmy-name" class="rs-radio"><input type="radio" name="prefixmy-name" xsd-type="radio"><strong>my-name</strong><br><span class="rs-help-block">awesomedoc</span></label></div>')

    });

    it('should init with no data attribute', function () {
        var element = angular.element('<repose-item></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div></div>')

    });

    it('should init with invalid data attribute', function () {
        $scope.data = "blah";
        var element = angular.element('<repose-item data="{{ data }}"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        expect($scope.$digest).toThrowError(TypeError, 'data is not valid');
        expect(reposeItemDirective[0].innerHTML).toEqual('<div></div>')
    });

    it('should init with list data set', function () {
        $scope.data = {
            doc: 'awesomedoc',
            name: 'my-name',
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'list'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-table filter-name="add-headers" prefix="prefixmy-name." data="[{&quot;item1&quot;:&quot;test&quot;},{&quot;item2&quot;:&quot;test&quot;}]" required="false" maxoccurs="1" class="ng-isolate-scope"><div></div></repose-table></div>')

    });

    it('should init with invalid type', function () {
        $scope.data = {
            doc: 'awesomedoc',
            name: 'my-name',
            minOccurs: 0,
            maxOccurs: 1,
            required: 'optional',
            items: [
                {
                item1: 'test',
                },
                {item2: 'test'
                }
            ],
            type: 'what'
        }
        var element = angular.element('<repose-item data="{{ data }}" prefix="prefix" filter-name="add-headers"></repose-item>');
        reposeItemDirective = $compile(element)($scope);
        $scope.$digest();
        expect(reposeItemDirective[0].innerHTML).toEqual('<div class="ng-scope"><repose-label value="my-name" required="false" doc="awesomedoc"><div></div></repose-label><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item1&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item><repose-item filter-name="add-headers" prefix="prefixmy-name." data="{&quot;item2&quot;:&quot;test&quot;}" class="ng-isolate-scope"><div class="ng-scope"></div></repose-item></div>')

    });
});
