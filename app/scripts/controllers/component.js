'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
.controller('ComponentInstanceCtrl', function ($scope, $modalInstance, filter, $log) {
    $log.info('inside component modal instance ctrl', filter);
    $scope.filter = filter;
    $scope.filter_name = filter.name;
    
    $scope.save = function() {
        $log.info('save');
        var elements = angular.element("#repose-filter").find(':input[xsd-type]');
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
        $log.info('save data', data);       
        $modalInstance.close(data);
    };

    $scope.dismiss = function () {
      $log.info("dismissed");
      $modalInstance.dismiss('cancel');
    };
  });
