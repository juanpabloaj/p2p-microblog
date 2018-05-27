var html = require('choo/html')

module.exports = function (post, i) {
  var date = post.date
  var url = post.url || '#'
  var content = post.content || post.title
  var source = post.source

  return html`
    <li>
        <div id=${i} class="post-container">
          <p>
          ${content}
          </p>
          <div class="clearfix">
            <div class="float-left">
              <a href=${source}>source</a>
            </div>
            <div class="float-right">
              <a href=${url}>${date}</a>
            </div>
          </div>
        </div>
    </li>
  `
}
