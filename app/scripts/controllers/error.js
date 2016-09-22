'use strict';
var loginPage = 'http://www.equilar.com/login';

angular.module('stormpathIdpApp')
  .controller('ErrorCtrl', function ($scope,$location,Stormpath) {
    $scope.errors = Stormpath.errors;
    $scope.inError = false;
    $scope.toRedirectPage = loginPage;
    var toRedirectPage = loginPage;
    $scope.$watchCollection('errors',function(){
      var hasError = $scope.errors.length > 0;
      if(hasError) {
    	  var redirectNow = false;
    	  
    	  if($location.search().jwt == null) {
    		  redirectNow = true;
    	  }
    	  if(Stormpath.errors[0] == 'JWT not found as url query parameter.') {
    		  redirectNow = true;
    	  }
    	  if(Stormpath.errors[0] == 'The JWT used to initialized the client was rejected.') {
    		  redirectNow = true;
    	  }
    	  var tryCustomLoginRedirect = false;
    	  if(Stormpath.errors[0] == 'Internal XMLHttpRequest Error') {
    		  Stormpath.errors[0] = "It looks like 'enterprise.stormpath.io' is blocked, please contact your network support team.";
    		  tryCustomLoginRedirect = true;
    	  }

		  var code = null;

          try {
            $.each(Stormpath.client.jwtPayload.scope.application, function(key, value) {
	          if (typeof key !== "function") {
        	    code=key;
	          }
            });
          } catch(exptn) {}
          
    	  if(redirectNow) {
              var url = getAppUrl(code);
              if (!url) {
            	  url = loginPage;
              }
    		  window.location.href = url;
    		  return;
    	  }
    	  
    	  if (tryCustomLoginRedirect) {
    		  var url = getCustomLoginRedirectUrl(code);
              if (url) {
            	  toRedirectPage = url;
            	  $scope.toRedirectPage = url;
            	  $scope.customRedirect = true;
              }
    	  }

    	  if (!$scope.customRedirect) {
    	  	window.setTimeout(function() {redirectToPage(toRedirectPage);}, 7000);
      	  }
      }

      $scope.inError = hasError;
    });
  });

function redirectToPage(page) {
	window.location.href = page;
}
