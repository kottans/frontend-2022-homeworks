export class Feed{
  constructor(observer) {
    this.className = 'feed';
    this.$loading = document.createElement('div');
    this.observer = observer;
    this.members = [];
    this.selectedMembers = [];
    this.membersPerPage = 60;
    this.filters = {
      'nick': ({login: {username: nick}}, data) => {
        return nick.toLowerCase().indexOf(data.toLowerCase()) >= 0;
      },
      'name': ({name: {first, last}}, data) => {
        return `${first} ${last}`.toLowerCase().indexOf(data.toLowerCase()) >= 0;
      },
      'gender': ({gender}, data) => {
        return data ? gender == data : true;
      },
      'agefrom': ({dob: {age}}, data) => {
        data = parseInt(data);
        return Number.isNaN(data) ? true : Number(age) >= data;
      },
      'ageto': ({dob: {age}}, data) => {
        data = parseInt(data);
        return Number.isNaN(data) ? true : Number(age) <= data;
      },
      'email': ({email}, data) => {
        return email.toLowerCase().indexOf(data.toLowerCase()) >= 0;
      },
      'city': ({location: {city}}, data) => {
        return city.toLowerCase().indexOf(data.toLowerCase()) >= 0;
      }
    },
    this.sorts = {
      'az': ({login: {username: nickOne}}, {login: {username: nickTwo}}) => {
        return `${nickOne}`.localeCompare(`${nickTwo}`);
      },
      'za': ({login: {username: nickOne}}, {login: {username: nickTwo}}) => {
        return `${nickTwo}`.localeCompare(`${nickOne}`);
      },
      'azname': ({name: {first: nameOne, second: surnameOne}}, {name: {first: nameTwo, second: surnameTwo}}) => {
        return `${nameOne} ${surnameOne}`.localeCompare(`${nameTwo} ${surnameTwo}`);
      },
      'zaname': ({name: {first: nameOne, second: surnameOne}}, {name: {first: nameTwo, second: surnameTwo}}) => {
        return `${nameTwo} ${surnameTwo}`.localeCompare(`${nameOne} ${surnameOne}`);
      },
      'yo': ({dob: {age: ageOne}}, {dob: {age: ageTwo}}) => {
        return ageOne - ageTwo;
      },
      'oy': ({dob: {age: ageOne}}, {dob: {age: ageTwo}}) => {
        return ageTwo - ageOne;
      },
      'on': ({registered: {date: dateOne}}, {registered: {date: dateTwo}}) => {
        return (new Date(dateOne)) - (new Date(dateTwo));
      },
      'no': ({registered: {date: dateOne}}, {registered: {date: dateTwo}}) => {
        return (new Date(dateTwo)) - (new Date(dateOne));
      },
    }
  }

  toHTML(){
    return `
    <div class="${this.className}">
      <div class="${this.className}__container"></div>
      <div class="${this.className}__pages"></div>
    </div>
    `
  }

  init() {
    this.$element = document.querySelector(`.${this.className}__container`);
    this.$pageContainer = document.querySelector(`.${this.className}__pages`);
    this.$pageContainer.addEventListener('click', this.onPageSelect.bind(this));
    this.showLoading();
    this.getMembersFromServer().then(() => {
        this.observer.subscribe('optionschange', this.onOptionsChange.bind(this));
        this.observer.emit('feedloaded');
      }
    ).catch((error) => {
      this.showMessage('Sorry, the server is busy. Try again later.');
    });
  }

  onPageSelect({target}) {
    const $page = target.closest(`.${this.className}__page`);
    if (!$page) return;
    this.$pageContainer.querySelectorAll(`.${this.className}__page`).forEach($page => $page.classList.remove(`${this.className}__page-current`));
    $page.classList.add(`${this.className}__page-current`);
    this.showPage(target.dataset.pageNumber);
    this.observer.emit('pageselected', target.dataset.pageNumber);
  }

  showLoading(){
    this.clear();
    this.$loading.classList.add('loading');
    this.$loading.insertAdjacentHTML('beforeend', `
      <h2 class="loading__title">Loading</h2>
      <p class="loading__accent">Please, wait</p>
      <div class="loading__triangle loading__triangle-outer">
        <div class="loading__triangle loading__triangle-middle">
          <div class="loading__triangle loading__triangle-inner"></div>
        </div>
      </div>
    `)
    this.$element.append(this.$loading);
  }

  clear(){
    this.$element.innerHTML = '';
  }

  async getMembersFromServer() {
    const numberOfMembers = Math.floor(Math.random() * 200 + 100);
    const response = await fetch(`https://randomuser.me/api/?results=${numberOfMembers}`);
    const {results: members} = await response.json();
    this.members = members;
  }

  showMessage(message) {
    this.clear();
    this.$element.insertAdjacentHTML('beforeend', `
      <div class="message"><p class="message__text">${message}</p></div>
    `)
  }

  applyFilters(filters, sort) {
    filters = Object.entries(filters);
    this.selectedMembers = this.members.slice();
    this.selectedMembers = filters.reduce((members, [filterName, data]) => {
      if (this.filters[filterName]) return members.filter(member => this.filters[filterName](member, data));
      throw new Error('There\'s no such page on server. Check the filter options you\'ve entered.');
    }, this.selectedMembers);
    if (this.sorts[sort]) this.selectedMembers = this.selectedMembers.sort(this.sorts[sort]);
    else throw new Error('There\'s no such page on server. Check the sort option you\'ve entered.');
  }

  createPagination(pageNumber = 0) {
    const numberOfPages = Math.ceil(this.selectedMembers.length / this.membersPerPage);
    if (numberOfPages < pageNumber) {
      throw new Error('There\'s no such page on server. Check the page number you\'ve entered.');
    }
    if (numberOfPages > 1) {
      const $pages = Array.from(Array(numberOfPages), (element, index) => {
        const $page = document.createElement('div');
        $page.classList.add(`${this.className}__page`);
        $page.textContent = index + 1;
        $page.setAttribute('data-page-number', index);
        return $page;
      })
      $pages[Number(pageNumber)].classList.add(`${this.className}__page-current`);
      this.$pageContainer.innerHTML = '';
      this.$pageContainer.append(...$pages);
      this.$pageContainer.classList.remove(`${this.className}__pages-hidden`);
    } else {
      this.$pageContainer.classList.add(`${this.className}__pages-hidden`);
    }
  }

  createCards(members) {
    this.clear();
    const imgSize = 128;
    members.forEach(({ 
      name: {
        first,
        last
      },
      location: {
        city
      },
      email,
      login: {
        username: nick
      },
      dob: {
        age
      },
      registered: {
        date
      },
      phone,
      picture: {
        large: avatar
      }}) => {
      this.$element.insertAdjacentHTML('beforeend', `
        <div class="card">
          <img src="${avatar}" width="${imgSize}" height="${imgSize}" class="card__img" alt="">
          <h5 class="card__nick">${nick}</h5>
          <h6 class="card__member-name">${first} ${last}</h6>
          <p class="card__age">${age} years</p>
          <p class="card__city">${city}</p>
          <p class="card__phone"><a class="card__link" href="tel:${phone}">${phone}</a></p>
          <p class="card__email"><a class="card__link" href="mailto:${email}">${email}</a></p>
          <p class="card__honor">${(new Date()).getFullYear() - (new Date(date)).getFullYear()} years on the site</p>
        </div>
      `)
    })
  }

  showPage(pageNumber = 0) {
    pageNumber = Number(pageNumber);
    const members = this.selectedMembers.slice(pageNumber * this.membersPerPage, (pageNumber + 1) * this.membersPerPage);
    this.createCards(members);
    document.body.scrollIntoView();
  }

  onOptionsChange({filters, sort, page}) {
    try {
      this.applyFilters(filters, sort);
      this.createPagination(page);
      this.showPage(page);
    } catch(error) {
      this.showMessage(error.message);
    }   
  }
}
