var getUrlInfo = async function (url) {
    var archive = new DatArchive(url)
    var info = await archive.getInfo()
    return info
}

module.exports = {
  loadJson: async function (url, filename) {
    var archive = new DatArchive(url)
    var content = await archive.readFile(filename)
    return JSON.parse(content)
  },
  writeJson: async function (url, filename, content) {
    var archive = new DatArchive(url)
    var jsonString = JSON.stringify(content, null, ' ')
    var content = await archive.writeFile(filename, jsonString)
    await archive.commit()
  },
  getUrlInfo: getUrlInfo,
  getSourcesInfo: async function (source) {
    var info = await getUrlInfo(source.url)
    source.title = info.title
    return source
  },
  getPosts: async function (url) {
    var json = await this.loadJson(url, 'posts.json')
    posts = json.posts.map(post => {
      post.source = url
      return post
    })
    return posts
  },
  updatePostsFile: async function(fileUrl, postUrl) {
    var posts = await this.getPosts(fileUrl)
    var newPost = {url: postUrl, date: (new Date()).toISOString()}
    posts.push(newPost)
    await this.writeJson(fileUrl, '/posts.json', {posts: posts})
  },
  getPostContent: async function (post) {
    var filename = '/post.txt'
    var archive = new DatArchive(post.url)

    var content = await archive.readFile(filename)
    var stat = await archive.stat(filename)

    post.date = stat.ctime
    post.content = content
    return post
  },
  publishPost: async function (content) {
    var archive = await DatArchive.create({
      title: 'new post',
      description: 'created to share ' + (new Date()).toISOString()
    })
    await archive.writeFile('/post.txt', content)
    await archive.commit()
    return archive.url
  }
}
