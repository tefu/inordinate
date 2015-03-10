var should = require('should'),
  assert = require('assert'),
  pass = require('../public/js/pass.js'),
  Api = require('../public/js/api.js')(pass.username, pass.password);

console.log('Running tests.');

function mayday(error) {
  console.log('Error! You did something bad!');
  console.log(error);
}

info = Api.userInfo();
info.then(function(data) {
  should.equal(data.userName, "dummyaccount");
}, mayday);


sub_added = Api.addSubscription('feed/https://lobste.rs');
sub_added.then(function(data) {
  should.equal(data.query, 'https://lobste.rs');
}, mayday);


sub_edited = Api.renameSubscription('feed/https://lobste.rs/rss', 'ebi');

sub_edited.then(function(data) {
  should.equal(data, 'OK');
}, mayday);

Api.unreadCount().then(function(data) {
  should.equal(data.max, 1000);
}, mayday);

Api.token().then(function (t1) {
  Api.token().then(function (t2) {
    should.equal(t1, t2);
  }, mayday);
}, mayday);

