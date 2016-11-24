'use strict';

angular.module('codefresh-challenge').controller('PushStepController', ($scope) => {

  var dockerProvider = { name: 'Standard Docker registry', value: 'docker' };
  var ecrProvider = { name: 'Amazon EC2 Container Registry', value: 'ecr' };

  $scope.step.name = 'push-step';

  $scope.providers = [
    dockerProvider,
    ecrProvider
  ];

  $scope.credentials = {};

  if (!$scope.step.provider) {
    $scope.step.provider = dockerProvider.value;
  }

  $scope.isEcr = () => {
    return $scope.$eval('step.provider') === ecrProvider.value;
  };

});
