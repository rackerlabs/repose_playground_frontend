'use strict';

angular.module('reposePlaygroundApp')
    .directive('component', function ($log, $compile) {
        return {
            restrict: 'E',
            link: function (scope, el, attrs) {
                $log.info('in component view component', scope, el, attrs, scope.filter);

                /*
                scope.createInstance = function () {
                    var elements = angular.element("form").find(':input[xsd-type]');
                    //iterate through all elements and get its values
                    var data = [];
                    angular.forEach(elements, function (element) {
                        if (element.type === "checkbox") {
                            data.push(
                                {
                                    'name': element.name,
                                    'value': element.checked,
                                    'type': element.attributes['xsd-type'].value,
                                    'filter': element.attributes['filter-name'].value
                                }
                                );
                        } else {
                            data.push(
                                {
                                    'name': element.name,
                                    'value': element.value,
                                    'type': element.attributes['xsd-type'].value,
                                    'filter': element.attributes['filter-name'].value
                                }
                                );
                        }
                    });
                    $modal.open({
                        templateUrl: '/views/create_file_modal.html',
                        backdrop: 'static',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            data: function () {
                                return data;
                            },
                            newInstance: function () {
                                return scope.newInstance;
                            },
                            isUploading: function () {
                                return false;
                            }
                        }
                    });
                }
                
                */

                //for each component, load repose filter...right now it's just one so it's superfulous
                var filterData = JSON.stringify(scope.filter.data);
                var filter = '<repose-filter name="' + scope.filter.name + '" data="' + scope.filter.data_label + '" />';
                el.append(filter);

                $compile(el.contents())(scope);
            }
        };
    });
