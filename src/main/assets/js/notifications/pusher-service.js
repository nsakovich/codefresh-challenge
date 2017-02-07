'use strict';

angular.module('codefresh-challenge').service('PusherService', () => {

  return {

    init(config) {
      this.config = config;
      this.pusher = new window.Pusher(config.key, {
          encrypted: true
      });
    },

    subscribe(channel) {
      return this.pusher.subscribe(channel);
    },

    sayHello() {
      window.alert('I am pusher!');
    }
  };
});
