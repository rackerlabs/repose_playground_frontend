'use strict';

angular.module('reposePlaygroundApp')
  .directive('getFilters', function (ReposeService, $log, $compile) {
    return {
      templateUrl: 'views/getReposeFilters.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.log('in get repose filters directive', scope, element, attrs);
        scope.repose.availableFiltersLoaded = false;
        scope.repose.availableFiltersLoading = false;
        scope.repose.availableFiltersErrored = false;

        scope.getFilters = function() {
          scope.ui.versionSelected = true;
          var versionId = scope.newInstance.version;
          $log.info('getFilters::getFilters()::version',versionId);
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
            $log.error('getFilters ReposeService.getFiltersByVersion::Got an error: ', err);
            $log.error('Set version select to false and empty available filters');

            scope.repose.availableFiltersLoaded = false;
            scope.repose.availableFiltersLoading = false;
            scope.repose.availableFiltersErrored = true;
            scope.ui.versionSelected = false;
            scope.repose.availableFilters = [];
            scope.ui.errorMessage = "This version is not available";

          });

        };


        function cleanErrors(){
          scope.ui.errorMessage = "";
        }
      }
    };
  });
