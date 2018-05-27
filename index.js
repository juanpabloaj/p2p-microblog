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
  state.sources = []
})

app.route('/', mainView)
app.mount('main')
