var React = require('react');

var Sidebar = React.createClass({
  render: function () {
    var self = this;
    console.log(self.props.activeSubscription);
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
