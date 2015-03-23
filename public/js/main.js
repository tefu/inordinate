var React = require('react'),
  component = require('omniscient'),
  Immutable = require('immutable'),
  immstruct = require('immstruct'),
  Feed = require('./js/feed.js'),
  Sidebar = require('./js/sidebar.js'),
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

var sub_list = immstruct({
  subscriptions: [{
    id: 'feed/https://lobste.rs/rss',
    title: 'ebi',
    categories: [],
    sortid: '014C4B14',
    firstitemmsec: 1425041239589549,
    url: 'https://lobste.rs/rss',
    htmlUrl: 'https://lobste.rs/',
    iconUrl: 'https://www.inoreader.com/cache/favicons/l/o/b/lobste_rs_16x16.png'
  }, {
    id: 'feed/http://kukuruku.co/rss/index/',
    title: 'Kukuruku / Technology Hub',
    categories: [],
    sortid: '014FE960',
    firstitemmsec: 1424052380360057,
    url: 'http://kukuruku.co/rss/index/',
    htmlUrl: 'http://kukuruku.co/',
    iconUrl: 'https://www.inoreader.com/cache/favicons/k/u/k/kukuruku_co_16x16.png'
  }]
});

function render(root, cursor) {
  React.render(
    root(cursor),
    document.getElementById('app'));
}

render(Sidebar, sub_list.cursor());
test_data.on('swap', render);

var Api = require('./js/api.js')(pass.username, pass.password);
Api.subscriptionList().then(function (obj) {
  return obj.subscriptions[1].id;
}).then(Api.streamContents).then(function (obj) {
  test_data.cursor().update(function (d) {
    return Immutable.Map(obj);
  });
});
