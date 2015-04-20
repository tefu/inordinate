function addClass (element, query, name) {
  var temp = element.cloneNode(true);
  var elements = temp.querySelectorAll(query);

  for(var i = 0; i < elements.length; i++) {
    elements[i].className = name;
  }

  return temp;
}

function addCSSToFeed (html) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  wrapper = addClass(wrapper, 'img','img-responsive');
  wrapper = addClass(wrapper, 'iframe','embed-responsive-item');

  return wrapper.innerHTML;
}

function removeAds (html) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  var ads = wrapper.querySelectorAll('center');

  for (var i = 0; i < ads.length; i++) {
    if (ads[i].innerHTML.match(/www.inoreader.com\/adv\/www/)) {
      ads[i].innerHTML = '';
    }
  }

  return wrapper.innerHTML;
}

function getFirstImage (html) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  var image = wrapper.querySelector('img');

  image = image ? image : document.createElement('img');

  return image;
}

module.exports = {
  addCSSToFeed: addCSSToFeed,
  removeAds: removeAds,
  getFirstImage: getFirstImage
};
