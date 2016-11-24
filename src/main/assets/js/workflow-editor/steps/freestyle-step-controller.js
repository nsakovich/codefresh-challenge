'use strict';

angular.module('codefresh-challenge').controller('FreestyleStepController', ($scope) => {

  $scope.step.name = 'freestyle-step';
  $scope.step.commands = [];
  $scope.step.environment = [];

  $scope.addCommand = () => {
    $scope.step.commands.push('');
  };

  $scope.addVariable = () => {
    $scope.step.environment.push('');
  };

  $scope.deleteCommand = (index) => {
    if (confirm('Are you sure?')) {
      $scope.step.commands.splice(index, 1);
    }
  };

  $scope.deleteVariable = (index) => {
    if (confirm('Are you sure?')) {
      $scope.step.environment.splice(index, 1);
    }
  };

});
