var React = require('react');

var Sidebar = React.createClass({
  getInitialState: function () {
    return {
      active: -1
    };
  },

  handleClick: function (sub, index) {
    this.setState({active: index});
    this.props.switchFeed(sub.id);
  },

  render: function () {
    var self = this;
    return (
    <ul className='list-group'>
      {self.props.subscriptions.map(function (sub, i) {
        return (
        <li className={'list-group-item truncate ' +
                       ((i === self.state.active) ?
                       'active-subscription' :
                       'subscription')}
            key={sub.id}
            onClick={function () {self.handleClick(sub, i);}}>
          <img className='sub-image' src={sub.iconUrl}>{' ' + sub.title}</img>
        </li>
        );
        })}
    </ul>);
  }
});

module.exports = Sidebar;
