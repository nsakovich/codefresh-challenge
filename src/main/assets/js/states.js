'use strict';

angular.module('codefresh-challenge').config(($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/pages/main.html',
    controller: 'MainConrtoller',
    resolve: {
      cfg: ($http) => {
        return $http.get('/api/settings').then((response) => { return response.data; });
      }
    }
  });

});
