'use strict';

angular.module('codefresh-challenge').controller('StepSettingsController', ($scope, $controller) => {
  $scope.isPushStep = $scope.type === 'push';
  $scope.isBuildStep = $scope.type === 'build';
  $scope.isGitCloneStep = $scope.type === 'git-clone';
  $scope.isFreestyle = $scope.type === 'freestyle';

  if ($scope.isPushStep) {
    $controller('PushStepController', { $scope });
  }

  if ($scope.isBuildStep) {
    $controller('BuildStepController', { $scope });
  }

  if ($scope.isGitCloneStep) {
    $controller('GitCloneStepController', { $scope });
  }

  if ($scope.isFreestyle) {
    $controller('FreestyleStepController', { $scope });
  }

  $scope.validateUniqueName = (stepName, currentStep) => {
    if (stepName) {
      return $scope.steps.filter(step => step.name === stepName && currentStep !== step).length === 0;
    } else {
      return true;
    }
  };

});
