'use strict';

angular.module('reposePlaygroundApp')
  .filter('isEmpty', function ($log) {
    return function(obj) {
      $log.info('in is empty filter', obj);
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    };
  });
