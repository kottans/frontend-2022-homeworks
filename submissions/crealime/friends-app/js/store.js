const config = {
  base: new URL('https://randomuser.me/api/'),
  inc: 'dob,gender,name,phone,location,picture,login',
  nat: 'us,de,fr,gb,ua,us,ca',
  results: 240,
  getUrl() {
    this.base.searchParams.set('inc', this.inc)
    this.base.searchParams.set('nat', this.nat)
    this.base.searchParams.set('results', this.results)
    return this.base
  }
}

class Store {
  constructor(url) {
    this.url = url
    this.persons = null
  }

  async init() {
    this.persons = await this.getData()
  }

  async getData() {
    try {
      return await fetch(this.url)
        .then(response => response.json())
        .then(response => response.results)
    }
    catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  }
}

const store = new Store(config.getUrl())

export default store
