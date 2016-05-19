'use strict';

angular.module('stormpathIdpApp')
  .controller('ErrorCtrl', function ($scope,$location,Stormpath) {
    $scope.errors = Stormpath.errors;
    $scope.inError = false;
    $scope.$watchCollection('errors',function(){
      $scope.inError = $scope.errors.length > 0;
      if($scope.inError) {
    	  if($location.search().jwt == null) {
    		  window.location.href = 'http://www.equilar.com/login.html';
    	  }
      }
    });
  });
