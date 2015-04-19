var React = require('react');


var Stream = require('./feed'),
  Sidebar = require('./sidebar'),
  Login = require('./login'),
  pass = require('./pass');

var Api = require('./api')(pass.username, pass.password);
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
      showSidebar: false
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
  
  componentDidMount: function () {
    var self = this;
    this.setState({subscriptions: [{
        id: 'feed/https://lobste.rs/rss',
        title: 'NOTebi',
        categories: [],
        sortid: '014C4B14',
        firstitemmsec: 1425041239589549,
        url: 'https://lobste.rs/rss',
        htmlUrl: 'https://lobste.rs/',
        iconUrl: 'https://www.inoreader.com/cache/favicons/l/o/b/lobste_rs_16x16.png'
      }]});
    // setTimeout(function () {
    //   self.switchFeed('feed/https://lobste.rs/rss');
    // }, 1000);
    // Api.subscriptionList().then(function (data) {
    //   console.log(self.state.subscriptions)
    // });
  },
  
  render: function () {
    return (
    <div>
      <div id='app-menu'>
        <i id='app-close' className="fa fa-lg fa-close"
      onClick={function () {window.require('nw.gui').App.closeAllWindows();}}></i>
      </div>
      <div className={ 'app-wrap ' + ((this.state.showSidebar) ? 'show-nav' : '')}>
        <div id='sidebar-menu'>
          <h2>Subscriptions</h2>
          <Sidebar subscriptions={this.state.subscriptions}
                  switchFeed={this.switchFeed} />
        </div>
        <a href='#' className='toggle-nav' onClick={this.toggleSidebar}>
          <i id='toggle-icon' className='fa fa-bars fa-lg'></i>
        </a>
        <div id='feed'>
          {new Stream(this.state.stream)}
        </div>
      </div>
    </div>)
  }
});

function render() {
  React.render(
    new MainApp(),
    document.getElementById('app'));
}

render();