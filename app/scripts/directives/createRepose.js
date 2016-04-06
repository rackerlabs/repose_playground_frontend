'use strict';

angular.module('reposePlaygroundApp')
  .directive('createRepose', function ($log, ReposeService) {
    return {
      templateUrl: 'views/createRepose.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.ui.VersionSelected = false;
        scope.repose.selectedFiltersLoaded = false;
        scope.repose.selectedFiltersLoading = false;
        scope.repose.selectedFiltersErrored = false;
                
        scope.addToComponentList = function(filter){
            //make a request to get Repose
            var versionId = scope.newInstance.version;
            var renderedFilters = scope.repose.renderedFilters;
            var selectedFilters = [];
            if (renderedFilters !== undefined) {
                selectedFilters = scope.newInstance.selectedFilters.filter(function (value) {
                    return renderedFilters.indexOf(value) == -1;
                });
            } else {
                selectedFilters = scope.newInstance.selectedFilters;
            }
            scope.repose.selectedFiltersLoading = true;

            ReposeService.getComponents(scope.newInstance.version, filter)
                .then(function (componentData) {
                    scope.ui.componentSelected = true;
                    var componentDataLabel = filter.replace(/-/g, "_") + "_data";

                    scope.repose.renderedFilters.push({
                        'name': filter,
                        'data_label': componentDataLabel,
                        'data': componentData
                    });
                    scope.repose.version = versionId;
                    scope.repose.selectedFiltersLoaded = true;
                    scope.repose.selectedFiltersLoading = false;
                    scope.repose.selectedFiltersErrored = false;
                    $log.info(scope.repose.renderedFilters);
                })
                .catch(function (err) {
                    $log.error('component directive ReposeService.getComponents::Got an error: ', err);
                    $log.error('Set version select to false and empty available filters');
                    scope.repose.errorMessage = err;
                    scope.repose.selectedFiltersLoaded = false;
                    scope.repose.selectedFiltersLoading = false;
                    scope.repose.selectedFiltersErrored = true;

                });   
        }
                
        scope.removeFromComponentList = function(filter){
            $log.error('remove', filter, scope.repose.renderedFilters);
            scope.repose.renderedFilters.splice(filter, 1);
        }

        ReposeService.getVersions()
        .then(function(versions){
          cleanErrors();
          scope.repose.availableVersions = versions;
          $log.info('createRepose directive ReposeService.getVersions::got back repose versions: ', versions);
        })
        .catch(function(err){
          scope.ui.reposeFetchError = true;
          scope.ui.errorMessage = err;
          $log.error('createRepose directive ReposeService.getVersions::Got an error: ', err);

        });

        scope.selectVersion = function(){
          scope.ui.VersionSelected = true;
        }

        function cleanErrors(){
          scope.repose.errorMessage = "";
        }

      }
    };
  });
