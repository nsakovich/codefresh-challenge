'use strict';

describe('main controller', () => {

  beforeEach(module('codefresh-challenge'));

  var $controller;

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));

	it('should say hello', () => {
    var $scope = {},
        helloMessage = '',
        $window = {
          alert: (msg) => {
            helloMessage = msg;
          }
        };

	  $controller('MainConrtoller', {
      $scope: $scope,
      $window: $window
     });

    $scope.sayHello();

    expect(helloMessage).toBe('Hello World!');
	});

});
