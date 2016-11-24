'use strict';

angular.module('codefresh-challenge').filter('stepsYaml', () => {
  return (input) => {
    var steps = JSON.parse(angular.toJson(input));
    var stepsMap = {};
    var result = {
      version: '1.0'
    };

    angular.forEach(steps, (step) => {
      if (step.name) {
        stepsMap[step.name] = step;
        step.type = step.parent.type;
        delete step.parent;
        delete step.name;
      }
    });

    if (Object.keys(stepsMap).length) {
      result.steps = stepsMap;
    }

    return window.YAML.stringify(result, 4, 2);

  };
});
