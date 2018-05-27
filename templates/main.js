var html = require('choo/html')

var post = require('./post.js')
var source = require('./source.js')

module.exports = function (state, emit) {
  return html`
    <main>
    <div id="main" class="container">
    <div class="row">
      <div id="sources" class="column column-40">
        <h4>Sources</h4>
        <form id="source-form" onsubmit=${submitSource}>
          <input id="new-source-url" name="url"
            placeholder="dat://..."
            type="text"
            required
          >
          <input type="submit" value="Add a new source">
        </form>
        <ul id="source-list">
          ${state.sources.map(sourceMap)}
        </ul>
      </div>
      <div class="column">
        <form id="login" onsubmit=${submitPost}>
          <textarea placeholder=" ..." name="title" id="new-post" required></textarea>
          <input type="submit" value="Create post">
        </form>
        <hr>
        <ul id="post-list">
          ${state.posts.map(post)}
        </ul>
      </div>
    </div>
    </div>
    </main>
  `

  function sourceMap(obj, i) {
    return source(removeSource, obj, i)
  }

  function removeSource(e) {
    var index = e.target.id
    emit('removeSource', index)
  }

  function submitPost(e) {
    e.preventDefault()
    var form = e.currentTarget
    var data = new FormData(form)

    var newPost = {}
    newPost.url = data.get('url')
    newPost.title = data.get('title')
    newPost.date = new Date()

    emit('addPost', newPost)
  }

  function submitSource(e) {
    e.preventDefault()
    var form = e.currentTarget
    var data = new FormData(form)

    var newSource = {}
    newSource.url = data.get('url')
    newSource.title = data.get('title')

    emit('addSource', newSource)
  }
}
