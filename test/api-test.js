var should = require('should'),
    assert = require('assert'),
    pass = require('../public/js/pass.js'),
    Api = require('../public/js/api.js')(pass.username, pass.password);

console.log('Running tests.');

info = Api.userInfo();
info.fork(function (error) {
  console.log(error);
}, function (data) {
  should.equal(data.userName, "dummyaccount");
});


sub_added = Api.addSubscription('feed/https://lobste.rs');
sub_added.fork(function (error) {
  console.log(error);
}, function (data) {
  should.equal(data.query, 'https://lobste.rs');
});


sub_edited = Api.renameSubscription('feed/http://feeds.arstechnica.com/arstechnica/science', 'Sniff.');

unread = Api.unreadCount();
