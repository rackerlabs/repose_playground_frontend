'use strict';

angular.module('reposePlaygroundApp')
  .directive('selectedFilterList', function (ReposeService, $log, $modal) {
    return {
      templateUrl: 'views/selectedFilterList.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.log('in selected filter list directive', scope, element, attrs);
        scope.repose.availableFiltersLoaded = false;
        scope.repose.availableFiltersLoading = false;
        scope.repose.availableFiltersErrored = false;
        
        scope.getComponent = function(filter) {
            $log.info('selectedFilterList::getComponent()', filter);
            var componentInstance = $modal.open({
                templateUrl: '/views/component_modal.html',
                backdrop: 'static',
                controller: 'ComponentInstanceCtrl',
                resolve: {
                    filter: function() {
                        return filter;
                    }
                }
            });
            
            componentInstance.result.then(
                function(result){
                    $log.error('component instance result', result);
                },
                function(error){
                    $log.error('component instance error', error);
                }
            );
        };
        
        //TODO: show component modal
        scope.getFilters = function() {
            console.log('test', scope.newInstance);
          scope.ui.versionSelected = true;
          var versionId = scope.newInstance.version;
          $log.info(versionId);
          scope.repose.availableFiltersLoading = true;

          ReposeService.getFiltersByVersion(versionId)
          .then(function(filters){
            scope.repose.availableFiltersLoaded = true;
            scope.repose.availableFiltersLoading = false;
            scope.repose.availableFiltersErrored = false;
            cleanErrors();
            scope.repose.availableFilters = filters;
            $log.info('getFilters directive ReposeService.getFiltersByVersion::got back repose filters ', filters, ' for : ', scope.newInstance.version);
          })
          .catch(function(err){
            scope.repose.availableFiltersLoaded = false;
            scope.repose.availableFiltersLoading = false;
            scope.repose.availableFiltersErrored = true;
            $log.error('getFilters ReposeService.getFiltersByVersion::Got an error: ', err);
            $log.error('Set version select to false and empty available filters');

            scope.ui.versionSelected = false;
            scope.repose.availableFilters = [];
            scope.repose.errorMessage = "This version is not available";

          });

        };

        function cleanErrors(){
          scope.repose.errorMessage = "";
        }
      }
    };
  });
