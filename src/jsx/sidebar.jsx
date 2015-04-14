var React = require('react');

var Sidebar = React.createClass({
  handleClick: function (i) {
    this.props.switchFeed(this.props.subscriptions[i]);
  },
  
  render: function () {
    var self = this;
    return (
    <ul className='list-group'>
      {self.props.subscriptions.map(function (sub, i) {
        return (
        <li className='list-group-item' onClick={self.handleClick.bind(self, i)}>
          <img src={sub.iconUrl}>{'        ' + sub.title}</img>
        </li>)
       })}
    </ul>);
  }
});

module.exports = Sidebar;
