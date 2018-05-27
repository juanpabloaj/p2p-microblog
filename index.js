const choo = require('choo')
const html = require('choo/html')
const dat = require('./lib/dat.js')

var mainView = require('./templates/main.js')

var app = choo()

app.use(function (state, emitter) {
  state.posts = []
  state.sources = []

  emitter.on('addPost', function (data) {
    dat.publishPost(data.content).then(url => {
      dat.updatePostsFile(window.location.toString(), url)
      emitter.emit('render')
    })
  })

  emitter.on('addSource', function (data) {
    state.sources.push(data)
    dat.writeJson(
      window.location.toString(),
      '/sources.json', {sources: state.sources}
    )
    emitter.emit('render')
  })

  emitter.on('removeSource', function (i) {
    state.sources.splice(i, 1)
    dat.writeJson(
      window.location.toString(),
      '/sources.json', {sources: state.sources}
    )
    emitter.emit('render')
  })

  emitter.on('getPostsFromSources', function () {
    state.sources.forEach(function(source){
      dat.getPosts(source.url).then(posts => {
        posts.forEach(function (post) {

          dat.getPostContent(post).then(newPost => {
            state.posts.unshift(newPost)
            emitter.emit('render')
          })

        })
      })
    })
  })

  dat.loadJson(window.location.toString(), '/sources.json').then(json => {
    state.sources = json.sources
    emitter.emit('getPostsFromSources')
    emitter.emit('render')
  })
})

app.route('/', mainView)
app.mount('main')
