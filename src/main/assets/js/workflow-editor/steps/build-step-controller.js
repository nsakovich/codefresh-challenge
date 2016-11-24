'use strict';

angular.module('codefresh-challenge').controller('BuildStepController', ($scope) => {

  $scope.step.name = 'build-step';
  $scope.step.working_directory = '${{main_clone}}';
  $scope.step.dockerfile = 'Dockerfile';
  $scope.step.build_arguments = [];

  $scope.addBuildArgument = () => {
    $scope.step.build_arguments.push('');
  };

  $scope.deleteBuildArgument = (index) => {
    if (confirm('Are you sure?')) {
      $scope.step.build_arguments.splice(index, 1);
    }
  };

});
