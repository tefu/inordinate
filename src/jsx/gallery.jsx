var React = require('react'),
    query = require('./domquery'),
    ImagesLoaded = require('imagesloaded');

module.exports = React.createClass({

  componentDidUpdate: function () {
    var container = document.querySelector('#gallery');
    var msnry = new Masonry(container, {
      msnry: new Masonry(container, {
        columnWidth: 10,
        itemSelector: '.image-post'
      })
    });
  },

  render: function () {
    var self = this;
    return (
    <div id='gallery'>
      {self.props.items.map(function (item, index) {
        var img = query.getFirstImage(
                  query.removeAds(item.summary.content));
        img.className = 'inner-image img-responsive';
        return (
        <div className='image-post'>
          <div>{item.title}</div>
          <div className='gallery-item'
                  key={item.id}
                  onClick={function () {
                    self.setState({activeId: item.id});
                  }}>
            <img src={img.src} className='inner-image img-responsive'/>
          </div>
        </div>);
      })}
    </div>);
  }
});
