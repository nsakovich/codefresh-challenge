'use strict';

var chance = require('chance').Chance();

describe('workflow editor', () => {

  var url = 'http://localhost:8082';

  var editor = {
    welcomeMessage: element(By.css('.workflow-editor__steps-container .alert-info')),
    addBtn: element(By.css('.workflow-editor__add-btn button')),
    addBuildStep: element(By.cssContainingText('.workflow-editor__new-step a', 'Build')),
    addPushStep: element(By.cssContainingText('.workflow-editor__new-step a', 'Push')),
    steps: element.all(By.css('.workflow-editor__steps-list .panel-default')),
    stepName: element(By.model('step.name'))
  };

  beforeEach(() => {
    browser.get(url);
  })

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Codefresh Challenge');
  });

  it('should show welcome message', () => {
    expect(editor.welcomeMessage.getText()).toEqual('Please add a new step ...');
  });

  it('should add a new step', () => {
    editor.addBtn.click();
    editor.addBuildStep.click();
    expect(editor.steps.count()).toEqual(1);
  });

  it('should build yaml config based on configuration steps', () => {
    editor.addBtn.click();
    editor.addBuildStep.click();

    browser.executeScript('return ace.edit(\'yaml-config\').getValue();').then((yaml) => {
      expect(yaml).toContain('build-step:');
    });
  });

  it('should update yaml when we edit configuration step', () => {
    var stepName = 'new-step-name';

    editor.addBtn.click();
    editor.addBuildStep.click();
    editor.stepName.sendKeys(stepName);

    browser.executeScript('return ace.edit(\'yaml-config\').getValue();').then((yaml) => {
      expect(yaml).toContain(`${stepName}:`);
    });
  });

});
