var React = require('react');

var Stream = require('./feed'),
    Gallery = require('./gallery'),
  Sidebar = require('./sidebar'),
  Login = require('./login'),
  pass = require('./pass');

var Api = null;
global.Api = Api;


var MainApp = React.createClass({

  getInitialState: function () {
    return {
      stream: require('./test_data'),
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
      activeSubscription: -1,
      showSidebar: true,
      View: Stream,
      unreadCounts: {}
    };
  },

  toggleSidebar: function () {
    this.setState({showSidebar: !(this.state.showSidebar)});
  },

  getActiveSubscription: function () {
    var active = this.state.activeSubscription;
    var subs = this.state.subscriptions;
    if (0 <= active && active < subs.length) {
      return subs[active];
    } else {
      return {};
    };
  },

  switchFeed: function (index) {
    var self = this;
    if (0 <= index && index < self.state.subscriptions.length) {
      var id = self.state.subscriptions[index].id;
      Api.streamContents(id).then(function (obj) {
        self.setState({stream: obj});
        self.setState({activeSubscription: index});
      });
    }
  },

  login: function (username, password) {
    Api = require('./api')(username, password);
  },

  toggleView: function () {
    this.setState({View: (this.state.View === Stream) ? Gallery : Stream});
  },

  componentWillMount: function () {
    var self = this;

    self.login(pass.username, pass.password);

    Api.subscriptionList().then(function (data) {
      self.setState({subscriptions: data.subscriptions});
    });

    Api.unreadCount().then(function (data) {
      self.setState({unreadCounts: self.makeUnreadCounts(data)});
    });
  },

  makeUnreadCounts: function (data) {
    var idToCounts = {};
    data.unreadcounts.forEach(function (unread) {
      idToCounts[unread.id] = unread.count;
    });
    return idToCounts;
  },

  render: function () {
    var self = this;
    var activeSub = self.getActiveSubscription();
    return (
    <div>
      <div id='wrapper' className={ ((self.state.showSidebar) ? '' : 'toggled')}>
        <div id='sidebar-wrapper'>
          <Sidebar subscriptions={self.state.subscriptions}
                   activeSubscription={self.state.activeSubscription}
                   switchFeed={self.switchFeed}
                   unreadCounts={self.state.unreadCounts} />
        </div>
        <a href='#' className='toggle-nav' onClick={self.toggleSidebar}>
          <i id='toggle-icon' className='fa fa-bars fa-lg'></i>
        </a>
        <div id='title-bar'>
          <a href={activeSub.htmlUrl}>{(activeSub.title || '.') + ''}</a>
          <i id='toggle-view' className={"fa fa-lg " + ((self.state.View === Stream) ?
                                    "fa-toggle-off" : "fa-toggle-on")}
           onClick={self.toggleView}></i>
        </div>
        <div id='page-content-wrapper'>
          <this.state.View items={self.state.stream.items} />
        </div>
      </div>
    </div>);
  }
});

function render() {
  React.render(
    <MainApp/>,
    document.getElementById('app'));
}

render();
