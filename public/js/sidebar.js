var React = require('react'),
  component = require('omniscient'),
  immstruct = require('immstruct');

var d = React.DOM;

var Subscription = component('Subscription', function (sub) {
  var switchFeed = function () {
    Api.streamContents(sub.id).then(function (obj) {
      state.cursor('stream').update('items', function (d) {
	return obj.items;
      });
    });
  };
  return d.div({},
    d.a({
      href: sub.url,
      onClick: switchFeed
    }, sub.title));
});

var Sidebar = component('Sidebar', function (props) {
  var subscriptions = props.subscriptions;
  return d.ul({},
    subscriptions.map(function (subscription) {
      return Subscription(subscription);
    }));
});

module.exports = Sidebar;
