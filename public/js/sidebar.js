var React = require('react'),
  component = require('omniscient'),
  immstruct = require('immstruct');

var d = React.DOM;

var Subscription = component('Subscription', function (sub) {
  return d.div({},
    d.a({
      href: sub.url
    }, sub.title));
});

var Sidebar = component('Sidebar', function (props) {
  var subscriptions = props.subscriptions.toArray();
  return d.ul({},
    subscriptions.map(function (subscription) {
      return Subscription(subscription);
    }));
});

module.exports = Sidebar;
