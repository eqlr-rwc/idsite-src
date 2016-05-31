'use strict';
var loginPage = 'http://www.equilar.com/login';

angular.module('stormpathIdpApp')
  .controller('ErrorCtrl', function ($scope,$location,Stormpath) {
    $scope.errors = Stormpath.errors;
    $scope.inError = false;
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
    	  
    	  if(redirectNow) {
    		  var code = null;

              try {
                $.each(Stormpath.client.jwtPayload.scope.application, function(key, value) {
    	          if (typeof key !== "function") {
            	    code=key;
    	          }
                });
              } catch(exptn) {}
              
              var url = getAppUrl(code);
              if (!url) {
            	  url = loginPage;
              }
    		  window.location.href = url;
    		  return;
    	  } else {
    		  window.setTimeout(redirectToLoginPage, 7000);
    	  }
      }

      $scope.inError = hasError;
    });
  });

function redirectToLoginPage() {
	window.location.href = loginPage;
}
