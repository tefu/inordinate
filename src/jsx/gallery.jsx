var React = require('react'),
    query = require('./domquery');

module.exports = React.createClass({

  componentDidMount: function () {
      var container = document.querySelector('#gallery');
      var msnry = new Masonry( container, {
          columnWidth: 100,
          itemSelector: '.image-post'
      });
  },

  render: function () {
    var self = this;
    console.log(self.props.items[0]);
    return (
    <div id='gallery'>
      {self.props.items.map(function (item, index) {
        var img = query.getFirstImage(
                  query.removeAds(item.summary.content));
        img.className = 'inner-image img-responsive';
        var wrapper = document.createElement('div');
        wrapper.appendChild(img);
        return (
        <div className='image-post'>
          <div>{item.title}</div>
          <div className='gallery-item'
                  key={item.id}
                  dangerouslySetInnerHTML={{__html: wrapper.innerHTML}}
                  onClick={function () {
                    self.setState({activeId: item.id});
                  }}>
          </div>
        </div>);
      })}
    </div>);
  }
});
