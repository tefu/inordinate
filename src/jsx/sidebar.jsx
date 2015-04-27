var React = require('react');

var Sidebar = React.createClass({
  render: function () {
    var self = this;
    return (
    <ul className='subscription-list'>
      {self.props.subscriptions.map(function (sub, i) {
        return (
        <li className={'subscription ' +
                       ((i === self.props.activeSubscription) ?
                       'active' :
                       '')}
            key={sub.id}
            onClick={function () {self.props.switchFeed(i);}}>
          <span className='unread-count badge'>{self.props.unreadCounts[sub.id] | 0}</span>
          <img className='sub-image' src={sub.iconUrl}></img>
          <span className='sub-title truncate'>{sub.title}</span>
        </li>
        );
        })}
    </ul>);
  }
});

module.exports = Sidebar;
