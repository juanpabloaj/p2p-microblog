var html = require('choo/html')

module.exports = function (post, i) {
  var title = post.title
  var url = post.url

  return html`
    <li>
        <button id=${i} onclick=${onclick}>${title} ${url}</button>
    </li>
  `
}
