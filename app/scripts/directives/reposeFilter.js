'use strict';

/**
 * Directive that loads repose filter
 */

angular.module('reposePlaygroundApp')
    .directive('reposeFilter', function ($log, $compile) {
        return {
            templateUrl: 'views/reposeFilter.html',
            restrict: 'E',
            // isolated scope? maybe later
            scope: {
                filter: '='
            },
            link: function (scope, element, attrs) {
                var filterName = attrs.data;
                var filterData = scope.filter.data[filterName];
                $log.error('reposeFilter::filter', scope.filter)
                //let's find all attributes
                var filterData = scope.filter.data;
                for (var key in filterData) {
                    switch (key) {
                        case 'doc':
                            //we take care of it in the name
                            break;
                        case 'name':
                            $log.error('reposeFilter::name', filterData.name)
                            var label = '<repose-label prefix="" value="' +
                                filterData.name +
                                '" doc="' + filterData.doc +
                                '" reposetitle="true" />';
                            element.children().append(label);
                            break;
                        case 'items':
                            //make sure this is not a list item
                            $log.error('reposeFilter::items', filterData.items)
                            if (!filterData.type || filterData.type !== 'list') {
                                for (var item = 0, max_items = filterData.items.length; item < max_items; item++) {
                                    var name = filterData.name.replace(/-/g, '_') + '_items' + item; // - not allowed in data :(
                                    var items = '<repose-item filter-name="' + filterName + '" prefix="' + filterData.name +
                                        '." data="' + name + '"/>';
                                    $log.error('item to add', items, name)

                                    element.children().append(items);
                                }
                            }
                            break;
                        default:
                            $log.error(key + ' not found');
                    }
                    $log.log('element contents', element.contents())
                    $compile(element.contents())(scope);
                }
            }
        };
    });
