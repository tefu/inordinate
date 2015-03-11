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

  describe('unreadCount()', function () {
    it('should have a max count of 1000.', function (done) {
      Api.unreadCount().then(function (data) {
        if (parseInt(data.max) === 1000) {
          done();
        } else {
          throw new Error('Max count isn\'t 1000.');
        }
      }, function (error) {
        throw error;
      });
    });
  });

  describe('token()', function () {
    it('should return a string', function (done) {
      Api.token().then(function (data) {
        if(data.length > 0)
          done();
        else
          throw new Error('Token has length 0.');
      }, function (error) {
        throw error;
      });
    });
  });

});
