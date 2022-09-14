export default class Store {
  constructor(url) {
    this.url = url
    this.persons = null
    this.errorCount = 0
    this.maxErrorCount = 5
  }

  async init() {
    this.persons = await this.getData()
    return this.persons
  }

  async getData() {
    try {
      return await fetch(this.url)
        .then(response => response.json())
        .then(response => response.results)
    }
    catch (err) {
      if (this.errorCount < this.maxErrorCount) {
        this.errorCount++
        return this.getData() // When an error is received from the server, the function is called again (CORS error)
      }
      console.log(err)
      return Promise.reject(err)
    }
  }
}
