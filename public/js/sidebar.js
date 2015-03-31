var React = require('react');

var d = React.DOM;

var Subscription = React.createClass({
  switchFeed: function () {
  },

  render: function () {
    return d.div({},
	    d.div({
	      onClick: this.switchFeed
	      }, d.img({
		src: this.props.sub.iconUrl
	      }),
	      this.props.sub.title));
  }
});

var Sidebar = React.createClass({
  render: function () {
    return d.ul({},
      this.props.subscriptions.map(function (subscription) {
	return new Subscription({sub: subscription});
      }));
  }
});

module.exports = Sidebar;
