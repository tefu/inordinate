var React = require('react'),
  component = require('omniscient'),
  Immutable = require('immutable'),
  immstruct = require('immstruct'),
  Feed = require('./js/feed.js'),
  Login = require('./js/login.js'),
  pass = require('./js/pass.js');

var test_data = immstruct({
  items: [{
    title: "Hello....",
    canonical: [{
      href: "https://www.google.com"
    }],
    summary: {
      direction: "ltr",
      content: "This here is a fine article."
    },
    author: "I'm an author!!!!"
  }]
});

function render() {
  React.render(
    Feed(test_data.cursor()),
    document.getElementById('app'));
}

render();
test_data.on('swap', render);

var Api = require('./js/api.js')(pass.username, pass.password);
Api.subscriptionList().then(function (obj) {
  return obj.subscriptions[1].id;
}).then(Api.streamContents).then(function (obj) {
  test_data.cursor().update(function (d) {
    return Immutable.Map(obj);
  });
});
