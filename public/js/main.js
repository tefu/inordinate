// Tutorial application for now.

var React     = require('react'),
    component = require('omniscient'),
    Immutable = require('immutable'),
    immstruct = require('immstruct'),
    Feed = require('./js/feed.js'),
    Login = require('./js/login.js'),
    pass = require('./js/pass.js');

var test_data = immstruct({
  posts: [
  { title: "HELLO",
    content: "Super cool microblog post." },
  { title: "Hello....",
    content: "Another super cool microblog post."}
  ]
});

function render () {
  React.render(
    Feed(test_data.cursor('posts')),
    document.getElementById('app'));
}

render();
test_data.on('swap', render);

setInterval(function () {
  var new_title = "This is another.";
  var new_content = "Please go away JS.";
  test_data.cursor('posts').update(function (post_list) {
    return post_list.push(Immutable.Map({ title: new_title, content: new_content }));
  });
}, 1000);



var Api = require('./js/api.js')(pass.username, pass.password);

var authID = Api;

console.log(authID);
authID.fork(function (error) {
  console.log("Didn't do shit: " + error);
}, function (data) {
  console.log("Worked: " + data);
});
