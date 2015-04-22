var React = require('react'),
    query = require('./domquery'),
    ImagesLoaded = require('imagesloaded');

module.exports = React.createClass({

  componentDidMount: function () {
      var container = document.querySelector('#gallery');
      var msnry = new Masonry( container, {
          columnWidth: 10,
          itemSelector: '.image-post'
      });
      ImagesLoaded(container, function () {
          msnry.layout();
      });
  },

  render: function () {
    var self = this;
    return (
    <div id='gallery'>
      {self.props.items.map(function (item, index) {
        var img = query.getFirstImage(
                  query.removeAds(item.summary.content));
        var wrapper = document.createElement('div');

        img.className = 'inner-image img-responsive';
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
