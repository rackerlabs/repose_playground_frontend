'use strict';

angular.module('reposePlaygroundApp')
    .directive('component', function (ReposeService, $log, $compile, $rootScope, $modal, $location) {
        return {
            restrict: 'E',
            link: function (scope, el, attrs) {
                $log.info('in component view component', scope, el, attrs);
                scope.repose.componentData = [];
                scope.repose.renderedFilters = [];

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

                scope.getComponent = function () {
                    $log.info('in getComponent function', scope, el, attrs)
                    //scope.ui.componentSelected = true;
                    var versionId = scope.newInstance.version;
                    var renderedFilters = scope.repose.renderedFilters[versionId];
                    var selectedFilters = [];
                    if (renderedFilters !== undefined) {
                        selectedFilters = scope.newInstance.selectedFilters.filter(function (value) {
                            return renderedFilters.indexOf(value) == -1;
                        });
                    } else {
                        selectedFilters = scope.newInstance.selectedFilters;
                    }
                    $log.info('selected filters: ', scope.newInstance.selectedFilters, selectedFilters, renderedFilters);

                    selectedFilters.forEach(function (componentName) {
                        ReposeService.getComponents(versionId, componentName)
                            .then(function (componentData) {
                                if (scope.repose.renderedFilters[versionId] === undefined) {
                                    scope.repose.renderedFilters[versionId] = [];
                                }
                                
                                scope.ui.componentSelected = true;
                                $log.info(componentData);
                                var componentDataLabel = componentName.replace(/-/g, "_") + "_data";
                                scope[componentDataLabel] = componentData;

                                //for each component, load repose filter...right now it's just one so it's superfulous
                                var filter = '<repose-filter name="' + componentName + '" data="{{ ' + componentDataLabel + ' }}" />';
                                el.append(filter);

                                $compile(el.contents())(scope);
                                cleanErrors();
                                scope.repose.renderedFilters[versionId].push(componentName);
                                scope.repose.version = scope.newInstance.version;
                                scope.repose.componentData.push(componentData);
                            })
                            .catch(function (err) {
                                $log.error('component directive ReposeService.getComponents::Got an error: ', err);
                                $log.error('Set version select to false and empty available filters');
                                scope.ui.componentSelected = false;

                                scope.repose.availableFilters = [];
                                scope.newInstance.selectedFilters = [];
                                scope.ui.errorMessage = err;

                            });
                    })
                };


                function cleanErrors() {
                    scope.ui.errorMessage = "";
                }
            }
        };
    });
