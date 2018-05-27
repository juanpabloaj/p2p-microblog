var html = require('choo/html')

module.exports = function (onclick, source, i) {
  var url = source.url
  var title = source.title || source.url

  return html`
    <li>
      <div>
      <a id=${i} href="${url}">${title}</a>
      <a href="" onclick=${onclick}>x</a>
      </div>
    </li>
  `
}
