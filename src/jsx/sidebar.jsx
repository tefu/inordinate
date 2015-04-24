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
    <ul className='subscription-list'>
      {self.props.subscriptions.map(function (sub, i) {
        return (
        <li className={'subscription ' +
                       ((i === self.state.active) ?
                       'active' :
                       '')}
            key={sub.id}
            onClick={function () {self.handleClick(sub, i);}}>
          <img className='sub-image' src={sub.iconUrl}></img>
          <span className='sub-title truncate'>{sub.title}</span>
          <span className='unread-count badge'>12</span>
        </li>
        );
        })}
    </ul>);
  }
});

module.exports = Sidebar;
