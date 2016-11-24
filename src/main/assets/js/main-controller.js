'use strict';

angular.module('codefresh-challenge').controller('MainConrtoller', ($scope, $window, $filter) => {

  $scope.steps = [];

  if ($scope.$watch) {
    $scope.$watch('steps', () => {
      if (!$scope.steps.length) {
        $scope.yamlConfig = '';
      } else {
        $scope.yamlConfig = $filter('stepsYaml')($scope.steps);
      }
    }, true);
  }

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
