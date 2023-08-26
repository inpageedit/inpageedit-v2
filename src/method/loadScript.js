export function loadScript(src, noCache) {
  return $.ajax({
    url: src,
    dataType: 'script',
    crossDomain: true,
    cache: !noCache,
  })
}
