var React = require('react');

var Sidebar = React.createClass({
  handleClick: function (i) {
    this.props.switchFeed(this.props.subscriptions[i]);
  },
  
  render: function () {
    var self = this;
    return (
    <ul>
      {self.props.subscriptions.map(function (sub, i) {
        return (
        <div onClick={self.handleClick.bind(self, i)}>
          <img src={sub.iconUrl}>{sub.title}</img>
        </div>)
       })}
    </ul>);
  }
});

module.exports = Sidebar;
