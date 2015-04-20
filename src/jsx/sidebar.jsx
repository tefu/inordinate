var React = require('react');

var Sidebar = React.createClass({
  handleClick: function (sub) {
    this.props.switchFeed(sub.id);
  },
  
  render: function () {
    var self = this;
    return (
    <ul className='list-group'>
      {self.props.subscriptions.map(function (sub, i) {
        return (
        <li className='list-group-item subscription'
            key={sub.id}
            onClick={function () {self.handleClick(sub);}}>
          <img src={sub.iconUrl}>{'        ' + sub.title}</img>
        </li>)
       })}
    </ul>);
  }
});

module.exports = Sidebar;
