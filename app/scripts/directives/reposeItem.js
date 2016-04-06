'use strict';

/**
 * Directive that loads each item
 */
angular.module('reposePlaygroundApp')
    .directive('reposeItem', function ($log, $compile) {
        return {
            templateUrl: 'views/reposeItem.html',
            restrict: 'E',
            scope: {
                item: '='
            },
            link: function (scope, element, attrs) {
                $log.error('reposeItem::in repose item directive', scope.item, element, attrs);
                if (scope.item !== undefined) {
                    var filterData = scope.item;
                    var prefix = attrs.prefix;
                    var filterName = attrs.filterName;
                    scope.filterName = attrs.filterName;
                    
                    if(filterData.name !== undefined) {
                        if (!filterData.type || filterData.type !== 'radio') {
                            var label = '<repose-label value="' +
                                filterData.name + '" required="' +
                                (filterData.required !== undefined && filterData.required === "required") +
                                '" doc="' + filterData.doc + '"/>';
                            element.children().append(label);
                        }
                    }
                    
                    
                    for (var key in filterData) {
                        $log.info('reposeItem::key', key, filterData[key]);
                        switch (key) {
                            case 'minOccurs':
                            //superfluous.  Taking care of it in required.
                            case 'maxOccurs':
                            //superfluous.  Taking care of it in required or items[list].
                            case 'required':
                            //we take care of it in the name
                            case 'doc':
                                //we take care of it in the name
                                break;
                            case 'name':
                                //unless there's a radio type...in that case, forward it away to somewhere else
                                break;
                            case 'items':
                                //we take care of it in the type
                                break;
                            case 'type':
                                //types can be many.  so we do a switch in a switch like a good like newbie
                                $log.info('reposeItem::type', filterData.type, filterData['xsd-type']);
                                switch (filterData.type) {
                                    case 'entry':
                                        $log.info('reposeItem::entry', filterData.items, filterData.type)
                                        var item = '<repose-item ng-repeat="item in item.items" filter-name="' + 
                                                   filterName + '" prefix="' + prefix + '.' + filterData.name + 
                                                   '" item="item"></repose-item>';
                                        element.children().append(item);
                                        break;
                                    case 'list':
                                        //it's a list
                                        var table_name = filterData.name.replace(/-/g, '_') + '_listitems';
                                        //scope[table_name] = filterData.items;
                                        var table = '<repose-table filter-name="' + filterName + '" prefix="' + prefix + '.' + 
                                            filterData.name + '." data="item.items" required="' +
                                            (filterData.required !== undefined && filterData.required === "required") +
                                            '" maxoccurs="' + filterData.maxOccurs + '"/>';
                                        element.children().append(table);
                                        break;
                                    case 'string':
                                        //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                                        var string = '<input filter-name="' + filterName + '" name="' + prefix + '.' + filterData.name +
                                            '" type="text" xsd-type="' + filterData['xsd-type'] + '" value="' + 
                                            (filterData.default !== undefined ? filterData.default : "") + '" />';
                                        element.children().append(string);
                                        break;
                                    case 'anyURI':
                                        //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                                        var anyURI = '<input filter-name="' + filterName + '" xsd-type="' + filterData['xsd-type'] +
                                            '" type="url" name="' + prefix + '.' + filterData.name +
                                            '" value="' + (filterData.default !== undefined ? filterData.default : "") + '" />';
                                        element.children().append(anyURI);
                                        break;
                                    case 'boolean':
                                        //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                                        var boolean = '<input filter-name="' + filterName + '" xsd-type="' + filterData['xsd-type'] +
                                            '" type="checkbox" name="' + prefix + '.' + filterData.name +
                                            '" ' + ((filterData.default !== undefined && filterData.default === "true") ? "checked" : "") + ' />';
                                        element.children().append(boolean);
                                        break;
                                    case 'int':
                                        //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                                        var int_type = '<input filter-name="' + filterName + '" xsd-type="' + filterData['xsd-type'] +
                                            '" type="number" min="' + filterData.minInclusive + '" name="' + prefix + '.' + filterData.name +
                                            '" value="' + (filterData.default !== undefined ? filterData.default : "") + '" />';
                                        element.children().append(int_type);
                                        break;
                                    case 'double':
                                        //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                                        var double = '<slider filter-name="filterName" name="' + prefix + '.' + filterData.name +
                                            '" xsd-type="item[\'xsd-type\']" ng-model="item.name" min="item.minInclusive" ' +
                                            'step="0.1" max="item.maxInclusive" value="item.default"></slider>'
                                        element.children().append(double)
                                        break;
                                    case 'radio':
                                        //TODO: check if there's an xsd-type associated with it.  if so, add ng-model
                                        var radio = '<label prefix="' + prefix + '.' + filterData.name +
                                            '" class="rs-radio"><input type="radio" name="' + prefix + filterData.name +
                                            '" xsd-type="' + filterData['xsd-type'] + '"><strong>' +
                                            filterData.name + '</strong><br><span class="rs-help-block">' + filterData.doc +
                                            '</span></label>';
                                        element.children().append(radio)
                                        break;
                                    case 'multi-select':
                                        $log.info('reposeItem::multi-select', filterData.type, filterData['sub-type'], filterData['xsd-type'])
                                        if(filterData['sub-type'] !== undefined) {
                                            switch(filterData['sub-type']) {
                                                case 'string':
                                                    var multiSelect = '<input type="text" filter-name="' + filterName + 
                                                                    '" xsd-type="' + filterData['xsd-type'] +
                                                                    '" class="rs-input-medium" name="' + 
                                                                    prefix + '.' + filterData.name + 
                                                                    '" value=""/>';
                                                    break;
                                                default:
                                                    $log.error('reposeItem::multi-select::error', filterData['sub-type'], 'not implemented');
                                            }
                                        } else {
                                            var multiSelect = '<select multiple filter-name="' + filterName + 
                                                            '" xsd-type="' + filterData['xsd-type'] +
                                                            '" class="rs-input-medium" name="' + 
                                                            prefix + '.' + filterData.name + 
                                                            '"><option data-ng-repeat="option in field.enumeration" value="option"></option></select>';
                                        }
                                        element.children().append(multiSelect)
                                        break;
                                    default:
                                        $log.error('reposeItem::error', filterData.type + ' not found');
                                }
                                break;
                            default:
                                $log.error('reposeItem::error', key + ' not found');
                        }
                    }
                    $compile(element.contents())(scope);
                }

            }
        };
    });
