var React = require('react');

var d = React.DOM;

var Sidebar = React.createClass(function () {
  function handleClick (i) {
    this.props.switchFeed(this.props.subscriptions[i]);
  }

  function render () {
    var self = this;
    return d.ul({},
      self.props.subscriptions.map(function (sub, i) {
	return d.div({},
	  d.div({
	      onClick: handleClick.bind(self, i)
	    }, d.img({
	      src: sub.iconUrl
	    }),
	    sub.title));
      }));
  }
  
  return {
    handleClick: handleClick,
    render: render
  };
}());

module.exports = Sidebar;
