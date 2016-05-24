'use strict';

angular.module('stormpathIdpApp')
  .controller('ErrorCtrl', function ($scope,$location,Stormpath) {
    $scope.errors = Stormpath.errors;
    $scope.inError = false;
    $scope.$watchCollection('errors',function(){
      $scope.inError = $scope.errors.length > 0;
      if($scope.inError) {
    	  var redirect = false;

    	  if($location.search().jwt == null) {
    		  redirect = true;
    	  }
    	  if(Stormpath.errors[0] == 'JWT not found as url query parameter.') {
    		  redirect = true;
    	  }
    	  if(Stormpath.errors[0] == 'The JWT used to initialized the client was rejected.') {
    		  redirect = true;
    	  }
    	  if(redirect) {
    		  window.location.href = 'http://www.equilar.com/login.html';
    	  }
      }
    });
  });
