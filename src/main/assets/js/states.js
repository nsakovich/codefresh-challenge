'use strict';

angular.module('codefresh-challenge').config(($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/pages/main.html',
    controller: 'MainConrtoller'
  });

});
