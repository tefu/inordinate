var React     = require('react'),
    component = require('omniscient'),
    immstruct = require('immstruct');

var d = React.DOM;

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

module.exports = Posts;