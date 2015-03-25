var React = require('react'),
  component = require('omniscient'),
  immstruct = require('immstruct');

var d = React.DOM;

var Item = component('Item', function (item) {
  return d.div({
      className: 'container'
    },
    d.div({
        className: 'row'
      },
      d.h2({}, d.a({
        href: item.canonical[0].href
      }, item.title)),
      d.p({
        dangerouslySetInnerHTML: {
          __html: item.summary.content
        }
      })
    ));
});

var Stream = component('Stream', function (props) {
  var items = props.items;
  return d.ul({},
    items.map(function (item) {
      return Item(item);
    }));
});

module.exports = Stream;
