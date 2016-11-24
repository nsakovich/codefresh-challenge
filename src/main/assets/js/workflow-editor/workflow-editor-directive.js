'use strict';

angular.module('codefresh-challenge').directive('workflowEditor', () => {
  return {
    restrict: 'EA',
    templateUrl: '/partials/workflow-editor/workflow-editor.html',
    scope: {
      steps: '='
    },
    link: ($scope) => {

      $scope.vm = {
        availableSteps: [
          { label: 'Build', order: 1, type: 'build' },
          { label: 'Push', order: 2 , type: 'push' },
          { label: 'Git Clone', order: 3, type: 'git-clone' },
          { label: 'Composition', order: 4, type: 'composition' },
          { label: 'Freestyle', order: 5, type: 'freestyle' }
        ],

        addedSteps: $scope.steps
      };

      $scope.canAddNewStep = () => {
        return $scope.vm.availableSteps.length > 0;
      };

      $scope.hasSteps = () => {
        return $scope.vm.addedSteps.length > 0;
      };

      $scope.removeStep = (step) => {
        if (confirm('Are you sure?')) {
          var steps = $scope.vm.addedSteps;
          var index = steps.indexOf(step);
          if (index >= 0) {
            steps.splice(index, 1);
          }
          $scope.vm.availableSteps.push(step.parent);
        }
      };

      $scope.addStep = (step) => {
        var steps = $scope.vm.availableSteps;
        var index = steps.indexOf(step);
        if (index >= 0) {
          steps.splice(index, 1);
        }
        $scope.vm.addedSteps.push({
          parent: step
        });
      };

    }
  };
});
