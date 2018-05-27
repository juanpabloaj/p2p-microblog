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
  },
  getPosts: async function (url) {
    var json = await this.loadJson(url, 'posts.json')
    return json.posts
  }
}
