module.exports = {
  loadJson: async function (url, filename) {
    var archive = new DatArchive(url)
    var content = await archive.readFile(filename)
    return JSON.parse(content)
  },
  writeJson: async function (url, filename, content) {
    var archive = new DatArchive(url)
    var jsonString = JSON.stringify(content)
    var content = await archive.writeFile(filename, jsonString)
    await archive.commit()
  },
  getPosts: async function (url) {
    var json = await this.loadJson(url, 'posts.json')
    return json.posts
  },
  publishPost: async function (content) {
    var archive = await DatArchive.create({
      title: 'new post',
      description: 'creating to share ' + (new Date()).toISOString()
    })
    await archive.writeFile('/post.txt', content)
    await archive.commit()
    return archive.url
  }
}
