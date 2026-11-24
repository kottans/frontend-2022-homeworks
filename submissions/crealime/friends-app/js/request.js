export default class Request {
  constructor(url) {
    this.url = url
    this.errorCount = 0
    this.maxErrorCount = 5
  }

  init() {
    try {
      return fetch(this.url)
        .then(response => {
          if (!response.ok && this.errorCount < this.maxErrorCount) {
            this.errorCount++
            return this.init()
          }
          else if (!response.ok) {
            console.error('Server error')
            return Promise.reject('Server error')
          }
          return response.json()
        })
        .then(response => response.results)
    }
    catch (err) {
      if (this.errorCount < this.maxErrorCount) {
        this.errorCount++
        return this.init()
      }
      console.error(err)
      return Promise.reject(err)
    }
  }
}
