'use strict';

angular.module('codefresh-challenge').controller('MainConrtoller', ($scope, $window, $filter, PusherService, cfg) => {

  $scope.steps = [];
  PusherService.init(cfg.pusher);

  PusherService.subscribe('pusher-channel').bind('save', (data) => {
    window.alert(data.message);
  });

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
