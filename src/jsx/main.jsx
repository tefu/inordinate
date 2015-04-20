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
      showSidebar: false,
      View: Stream
    };
  },

  toggleSidebar: function () {
    this.setState({showSidebar: !(this.state.showSidebar)});
  },

  switchFeed: function (id) {
    var self = this;
    Api.streamContents(id).then(function (obj) {
      self.setState({stream: obj});
    });
  },

  login: function (username, password) {
    Api = require('./api')(username, password);
  },

  toggleView: function () {
      this.setState({View: (this.state.View === Stream) ? Gallery : Stream});
  },

  componentDidMount: function () {
    var self = this;

    self.login(pass.username, pass.password);

    Api.subscriptionList().then(function (data) {
      self.setState({subscriptions: data.subscriptions});
    });
  },

  render: function () {
    var self = this;
    return (
    <div>
      <div id='app-menu'>
        <i className={"fa fa-lg " + ((self.state.View === Stream) ?
                                    "fa-toggle-off" : "fa-toggle-on")}
           onClick={self.toggleView}></i>
      </div>
      <div className={ 'app-wrap ' + ((self.state.showSidebar) ? 'show-nav' : '')}>
        <div id='sidebar-menu'>
          <h2>Subscriptions</h2>
          <Sidebar subscriptions={self.state.subscriptions}
                  switchFeed={self.switchFeed} />
        </div>
        <a href='#' className='toggle-nav' onClick={self.toggleSidebar}>
          <i id='toggle-icon' className='fa fa-bars fa-lg'></i>
        </a>
        <div id='feed'>
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
