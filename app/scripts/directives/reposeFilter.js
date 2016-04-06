'use strict';

/**
 * Directive that loads repose filter
 */

angular.module('reposePlaygroundApp')
    .directive('reposeFilter', function ($log, $compile) {
        return {
            templateUrl: 'views/reposeFilter.html',
            restrict: 'E',
            scope: {
                filter: '='
            },
            link: function (scope, element, attrs) {
                var filterName = scope.filter.name;
                $log.info('reposeFilter::filter', scope.filter)
                //let's find all attributes
                var filterData = scope.filter.data;
                
                if(filterData.name !== undefined) {
                    var label = '<repose-label prefix="" value="' +
                        filterData.name +
                        '" doc="' + filterData.doc +
                        '" reposetitle="true" />';
                    element.children().append(label);
                }
                
                if(filterData.items !== undefined) {
                    if (!filterData.type || filterData.type !== 'list') {
                        $log.info('reposeFilter::items', filterData.items)
                        var item = '<repose-item ng-repeat="item in filter.data.items" filter-name="' + 
                                    filterName + '" prefix="' + filterData.name + 
                                    '" item="item"></repose-item>';
                        element.children().append(item);
                    } else {
                        $log.error('reposeFilter::items sets up a list in filter.  Not implemented');
                    }
                    
                }
                
                for (var key in filterData) {
                    $log.info('reposeFilter::key', key, filterData[key]);
                    //switch/case doesn't work because of order things
                    //leave this for now to figure out which keys are not found
                    
                    switch (key) {
                        case 'doc':
                        case 'name':
                        case 'items':
                            break;
                        default:
                            $log.error('reposeFilter::error', key + ' not found');
                    }
                    $log.log('element contents', element.contents())
                }

                $compile(element.contents())(scope);
            }
        };
    });
