var React = require('react'),
    query = require('./domquery');

module.exports = React.createClass({

  render: function () {
    var self = this;
    return (
    <div id='gallery'>
      {self.props.items.map(function (item, index) {
        var img = query.getFirstImage(
                  query.removeAds(item.summary.content));
        img.className = 'inner-image img-responsive';
        return (
        <a href={item.canonical[0].href}>
          <div className='image-post'>
            <div>{item.title}</div>
              <div className='gallery-item'
                      key={item.id}
                      onClick={function () {
                        self.setState({activeId: item.id});
                      }}>
                <img src={img.src} className='inner-image img-responsive'/>
              </div>
          </div>
        </a>
        );
      })}
    </div>);
  }
});
