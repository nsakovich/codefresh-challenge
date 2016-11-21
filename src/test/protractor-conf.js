var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  specs: ['**/e2e/*.js'],
  framework: 'jasmine2',

  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs'
  },

  jasmineNodeOpts: {
    grep: '',
    print: function() {}
  },

  onPrepare: function() {
    var consoleReporter = new SpecReporter({
      displaySpecDuration: true,
      displaySuiteNumber: true,
      displayPendingSummary: false,
      displayFailuresSummary: false
    });

    jasmine.getEnv().addReporter(consoleReporter);
  }

};
