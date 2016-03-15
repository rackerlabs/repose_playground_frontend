'use strict';

angular.module('reposePlaygroundApp')
  .directive('reposeTable', function ($log, $compile) {
    return {
      templateUrl: 'views/reposeTable.html',
      restrict: 'E',
      scope: {
        data: '@'
      },
      link: function (scope, element, attrs) {
        $log.log('in repose table directive', scope, element, attrs);
        scope.prefix = attrs.prefix;
        scope.filterName = attrs.filterName;
        scope.fields = [];
        
        try {
            scope.fields = JSON.parse(scope.data);
        }catch(e){
            $log.error('invalid data');
        }
        
        scope.list = []

        var initial_element = {};
        for(var field = 0, max_fields = scope.fields.length; field < max_fields; field ++ ){
          initial_element[scope.fields[field].name] = { 
            name: scope.fields[field].name,
            minInclusive: scope.fields[field].minInclusive,
            maxInclusive: scope.fields[field].maxInclusive,
            default: scope.fields[field].default,
            'xsd-type': scope.fields[field]['xsd-type'],
            'filter-name': attrs.filterName
          };
          $log.log('repose table test', scope.fields[field], initial_element);
        }
        scope.list.push(initial_element);

        scope.addOneToList = function(data) {
          $log.info('addOneToList', data)
          var newData = data[0];
          delete newData.$$hashKey
          data.push(newData)
          $log.info('addOneToList', data)
        }

        scope.removeOneFromList = function(list, index) {
          $log.info('removeOneFromList', list, index)
          list.splice(index, 1);
          $log.info('removeOneFromList', list, index)
        }
      }
    };
  });
