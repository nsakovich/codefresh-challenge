/* global chance */
'use strict';

describe('step settings controller', () => {

  beforeEach(module('codefresh-challenge'));

  var $controller;

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should set default provider for push step', () => {
    var step = {
      name: chance.name(),
    }, $scope = {
      steps: [step],
      step: step,
      type: 'push'
    };

    $controller('StepSettingsController', { $scope });
    expect(step.provider).toBe('docker');
  });

  it('should return true if step name is unique', () => {
    var step = {
      name: chance.name()
    }, $scope = {
      steps: [step]
    };

    $controller('StepSettingsController', { $scope });
    expect($scope.validateUniqueName(step.name, step)).toBe(true);
  });

  it('should return false if step name is not unique', () => {
    var step = {
      name: chance.name()
    }, $scope = {
      steps: [step]
    };

    $controller('StepSettingsController', { $scope });
    expect($scope.validateUniqueName(step.name, { name: step.name })).toBe(false);
  });


});
