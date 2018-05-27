var html = require('choo/html')

module.exports = function (source, i) {
  var title = source.title
  var url = source.url

  return html`
    <li>
        <button id=${i} onclick=${onclick}>${title} ${url}</button>
    </li>
  `
}
