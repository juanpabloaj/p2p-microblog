const choo = require('choo')
const html = require('choo/html')
const dat = require('./lib/dat.js')
const utils = require('./lib/utils.js')

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

  emitter.on('getPostsFromAllSources', function () {
    state.sources.forEach(function(source){
      emitter.emit('getPostsFromSource', source.url)
    })
  })

  emitter.on('getPostsFromSource', function (url) {
    dat.getPosts(url).then(posts => {
      posts.forEach(function (post) {

        dat.getPostContent(post).then(newPost => {

          if (!utils.urlInArray(newPost.url, state.posts)) {
            state.posts.unshift(newPost)
            emitter.emit('render')
          }

        })

      })
    })
  })

  emitter.on('getSourcesInfo', function () {
    var result = state.sources.map(dat.getSourcesInfo)

    Promise.all(result).then(updatedSources => {
      state.sources = updatedSources
    })
  })

  dat.loadJson(window.location.toString(), '/sources.json').then(json => {
    state.sources = json.sources

    state.events = state.sources.map(source => {
      var archive = new DatArchive(source.url)
      var evts = archive.watch('/posts.json')
      evts.addEventListener('changed', ({path}) => {
        emitter.emit('getPostsFromSource', source.url)
      })
      return {url: source.url, events: evts}
    })

    emitter.emit('getPostsFromAllSources')
    emitter.emit('getSourcesInfo')
    emitter.emit('render')
  })
})

app.route('/', mainView)
app.mount('main')
