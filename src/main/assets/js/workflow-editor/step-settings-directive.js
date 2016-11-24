'use strict';

angular.module('codefresh-challenge').directive('stepSettings', () => {
  return {
    restrict: 'EA',
    templateUrl: '/partials/workflow-editor/step-settings.html',
    scope: {
      step: '=',
      type: '=',
      steps: '='
    },
    controller: 'StepSettingsController',
    link: ($scope) => {
      $scope.template = `/partials/workflow-editor/steps/${$scope.type}.html`;

      $scope.validateUniqueName = (stepName, currentStep) => {
        if (stepName) {
          return $scope.steps.filter(step => step.name === stepName && currentStep !== step).length === 0;
        } else {
          return true;
        }
      };
    }
  };
});
