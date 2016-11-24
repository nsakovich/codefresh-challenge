'use strict';

angular.module('codefresh-challenge').controller('GitCloneStepController', ($scope) => {

  $scope.step.name = 'git-clone-step';
  $scope.step.working_directory = '${{main_clone}}';
  $scope.step.revision = 'master';

});
