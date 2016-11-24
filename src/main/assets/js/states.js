'use strict';

angular.module('codefresh-challenge').config(($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/pages/main.html',
    controller: 'MainConrtoller'
  });

}).controller('MainConrtoller', ($scope, $window, $filter) => {

  $scope.steps = [];

  $scope.$watch('steps', () => {
    if (!$scope.steps.length) {
      $scope.yamlConfig = '';
    } else {
      $scope.yamlConfig = $filter('stepsYaml')($scope.steps);
    }
  }, true);

  $scope.yamlSettings = {
    useWrapMode : true,
    showGutter: false,
    theme:'twilight',
    mode: 'yaml'
  };

  $scope.sayHello = () => {
    $window.alert('Hello World!');
  };

});
