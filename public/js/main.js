// Tutorial application for now.

var fs = require('fs'),
    file = require('./js/file.js'),
    pass = require('pass.js'),
    gui = require('nw.gui'),
    request = require('request'),
    React     = require('react'),
    component = require('omniscient'),
    Immutable = require('immutable'),
    immstruct = require('immstruct');

var d = React.DOM;

var data = immstruct({ numbers: {} });

var test_data = immstruct({
  posts: [
  { title: "HELLO",
    content: "Super cool microblog post." },
  { title: "Hello....",
    content: "Another super cool microblog post."}
  ]
});

var Post = component('Post', function (props) {
  var post = props.cursor.toJS();
  return d.div({className: 'container'},
           d.div({className: 'row'},
             d.div({className: 'one-half column'},
               d.h2({}, post.title),
               d.p({}, post.content))
         ));
});


var Posts = component('Posts', function (props) {
  var posts = props.cursor.toArray();
  return d.ul({},
              posts.map(function (post) {
                return Post(post);
              }));
});


function render () {
  React.render(
    Posts(test_data.cursor('posts')),
    // Buckets(data.cursor('numbers')),
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