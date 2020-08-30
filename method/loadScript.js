var loadScript = function (src) {
  return $.ajax({
    url: src,
    dataType: 'script',
    crossDomain: true,
    cache: true
  });
}

module.exports = {
  loadScript
}