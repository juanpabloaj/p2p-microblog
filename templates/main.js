var html = require('choo/html')

var post = require('./post.js')

module.exports = function (state, emit) {
  return html`
    <main>
    <h1>hello world ${new Date()}</h1>
      <ul class="posts">
        ${state.posts.map(post)}
      </ul>
    </main>
  `
}
