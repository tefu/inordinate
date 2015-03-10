var assert = require('assert'),
  pass = require('../public/js/pass.js'),
  Api = require('../public/js/api.js')(pass.username, pass.password);

describe('Api', function () {
  var sub = 'https://lobste.rs';
  describe('userInfo()', function () {
    it('Should return correct username.', function (done) {
      Api.userInfo().then(function (data) {
        if (data.userName === pass.username)
          done();
        else
          throw new Error('Account name is not correct.');
      }, function (error) {
        throw error;
      });
    });
  });

  describe('addSubscription()', function () {
    it('Should return a JSON object with the subscription query.', function (done) {
      Api.addSubscription('feed/' + sub).then(function (data) {
        if (data.query === sub)
          done();
        else
          throw new Error('Sent query is not the same as returned query.');
      }, function (error) {
        throw error;
      });
    });
  });

  describe('renameSubscription()', function () {
    it('Should return \'OK\'', function (done) {
      Api.renameSubscription('feed/' + sub + '/rss').then(function (data) {
        if (data === 'OK')
          done();
        else
          throw new Error('Could not rename subscription.');
      }, function (error) {
        throw error;
      });
    });
  });

});
