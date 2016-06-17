'use strict';

angular.module('stormpathIdpApp')
  .controller('FaqCtrl', function ($scope, Stormpath) {

    Stormpath.init.then(function initSuccess(){
    });
  });
