var React = require('react'),
  component = require('omniscient'),
  Immutable = require('immutable'),
  immstruct = require('immstruct');

var state = immstruct({
  stream: {
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
  },
  subscriptions: [{
    id: 'feed/https://lobste.rs/rss',
    title: 'ebi',
    categories: [],
    sortid: '014C4B14',
    firstitemmsec: 1425041239589549,
    url: 'https://lobste.rs/rss',
    htmlUrl: 'https://lobste.rs/',
    iconUrl: 'https://www.inoreader.com/cache/favicons/l/o/b/lobste_rs_16x16.png'
  }],
  showSidebar: false
});

global.state = state;

var Feed = require('./js/feed.js'),
  Sidebar = require('./js/sidebar.js'),
  Login = require('./js/login.js'),
  pass = require('./js/pass.js');

var Api = require('./js/api.js')(pass.username, pass.password);
global.Api = Api;

var d = React.DOM;

var MainApp = component('MainApp', function (props) {
  var data = props.current.toJS();
  var toggleSidebar = function () {
    state.cursor('showSidebar').update(function (flag) {
      return !flag;
    });
  }
  return d.div({
      id: 'main-app',
      className: (data.showSidebar) ? 'show-nav' : ''
    }, d.div({
      id: 'canvas'
    }, d.div({
        id: 'sidebar-menu'
      }, d.h2({}, 'Subscriptions'),

      Sidebar({
        subscriptions: data.subscriptions
      })), 
      d.a({
        href: '#',
        className: 'toggle-nav',
        onClick: toggleSidebar
      }, d.i({
	id: 'toggle-icon',
        className: 'fa fa-bars fa-lg'
      })), Feed(data.stream))

  );
});

function render() {
  React.render(
    MainApp(state),
    document.getElementById('app'));
}

render();
state.on('swap', render);

Api.subscriptionList().then(function (obj) {
  state.cursor('subscriptions').update(function () {
    return obj.subscriptions;
  });
  return obj.subscriptions[0].id;
}).then(Api.streamContents).then(function (obj) {
  state.cursor('stream').update('items', function (d) {
    return obj.items;
  });
});
