'use strict';

var app = angular.module('codefresh-challenge', [
  'templates-all',
  'ui.router',
  'ngDialog',
  'toastr',
  'permission',
  'permission.ui',
  'validation.match',
  'pascalprecht.translate',
  'ngMessages',
  'ui.bootstrap'
]);

app.config(($httpProvider, $translateProvider) => {

  $httpProvider.interceptors.push(($templateCache, toastr, $q) => {
    return {
      request: (request) => {

        if(request.method === 'GET' && request.url.indexOf('.html') > 0 && !$templateCache.get(request.url)) {
          request.url = request.url.split('.').join('.en.');
        }

        return request;
      },

      responseError: (error) => {
        var message = (error.data && error.data.message) || error.statusText || error.data || error.message;
        toastr.error(message);
        return $q.reject(error);
      }
    };
  });

  $translateProvider.useUrlLoader('/api/i18n');
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);

});

app.factory('$exceptionHandler', ($injector) => {
  return (exception) => {
    $injector.get('toastr').error(exception.message);
  };
});
