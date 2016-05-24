'use strict';

angular.module('stormpathIdpApp')
  .directive('passwordPolicyValidation', function (Stormpath,$routeParams) {
    return {
      restrict: 'A',
      link: function postLink(scope) {

        scope.errors = {
          minLength: false,
          maxLength: false,
          requireLowerCase: false,
          requireUpperCase: false,
          requireNumeric: false,
          requireDiacritical: false
        };
        scope.errorCount = function(){
          return Object.keys(scope.errors).filter(function(k){
            return scope.errors[k];
          }).length;
        };
        scope.validate = function(element){
          scope.clearErrors();
          var v = element.val();

          var unTxt = $routeParams.un;
          var emTxt = $routeParams.em;
          var username = unTxt == null ? '':unTxt.substring(5);
          var email = emTxt == null ? '':emTxt.substring(5);
          var idEmail = email.indexOf('@') > -1 ? email.split('@')[0] : '';
          
          var tests =  [
            ['minLength' , function(){return v.length < 8;}],
            ['maxLength' , function(){ return false && Stormpath.idSiteModel.passwordPolicy && v.length > Stormpath.idSiteModel.passwordPolicy.maxLength;}],
            ['requireLowerCase' , function(){ return false && Stormpath.idSiteModel.passwordPolicy && !(/[a-z]/).test(v);}],
            ['requireUpperCase' , function(){ return false && Stormpath.idSiteModel.passwordPolicy && !(/[A-Z]/).test(v);}],
            ['requireNumeric' , function(){ return false && Stormpath.idSiteModel.passwordPolicy && !(/[0-9]/).test(v);}],
            ['requireDiacritical' , function(){ return false &&  Stormpath.idSiteModel.passwordPolicy && !(/[\u00C0-\u017F]/).test(v);}],
            ['requireDiversity' , function(){ 
            	var matchCount = 0;
            	if ((/[A-Z]/).test(v)) {
            		matchCount++;
            	}
            	if ((/[0-9]/).test(v)) {
            		matchCount++;
            	}
            	if ((/[^a-zA-Z0-9 ]/).test(v)) {
            		matchCount++;
            	}
            	return matchCount<2;
            	}],
            ['wordPassword' , function(){ return v.toLowerCase().indexOf("password") > -1;}],
            ['wordEquilar' , function(){ return v.toLowerCase().indexOf("equilar") > -1;}],
            ['hasUsername' , function(){ return username.length > 0 && v.toLowerCase().indexOf(username.toLowerCase()) > -1;}],
            ['hasEmail' , function(){ return idEmail.length > 0 && v.toLowerCase().indexOf(idEmail.toLowerCase()) > -1;}]
          ];

          for(var i=0;i<tests.length;i++){
            scope.errors[tests[i][0]] = tests[i][1](v);
            if(scope.errorCount()>0){
              break;
            }
          }

          scope.validationError = scope.errorCount() > 0 ;
          return scope.validationError;
        };
      }
    };
  });
