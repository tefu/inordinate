var React = require('react'),
    query = require('./domquery');

module.exports = React.createClass({

  render: function () {
    var self = this;
    return (
    <ul>
      {self.props.items.map(function (item, index) {
        var img = query.getFirstImage(query.removeAds(item.summary.content));
        var wrapper = document.createElement('div');
        wrapper.appendChild(img.cloneNode(true));
        return (<div className="image-post"
                  key={item.id}
                  dangerouslySetInnerHTML={{__html: wrapper.innerHTML}}
                  onClick={function () {
                    self.setState({activeId: item.id});
                  }}></div>);
      })}
    </ul>);
  }
});
