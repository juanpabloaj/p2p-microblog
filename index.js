const choo = require('choo')
const html = require('choo/html')
const dat = require('./lib/dat.js')

var mainView = require('./templates/main.js')

var app = choo()

app.use(function (state, emitter) {
  state.posts = [{
    title: 'post 0',
    url: 'url000'
  }, {
    title: 'post 1',
    url: 'url111'
  }]
  state.sources = [{
    title: 'dat source',
    url: 'dat://'
  }]

  emitter.on('addPost', function (data) {
    state.posts.push(data)
    dat.writeJson(
      window.location.toString(),
      '/posts.json', {posts: state.posts}
    )
    emitter.emit('render')
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

  dat.loadJson(window.location.toString(), '/sources.json').then(json => {
    state.sources = json.sources
    emitter.emit('render')
  })
})

app.route('/', mainView)
app.mount('main')
