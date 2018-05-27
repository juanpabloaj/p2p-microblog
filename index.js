const choo = require('choo')
const html = require('choo/html')

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
    emitter.emit('render')
  })

  emitter.on('addSource', function (data) {
    state.sources.push(data)
    emitter.emit('render')
  })

  emitter.on('removeSource', function (i) {
    state.sources.splice(i, 1)
    emitter.emit('render')
  })
})

app.route('/', mainView)
app.mount('main')
