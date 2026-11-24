export class Options {
  constructor(observer) {
    this.className = 'options';
    this.$button = document.querySelector(`.header__button`);
    this.observer = observer;
    this.options = {
      filters: {},
      sort: 'az'
    };
    this.$inputs = {};
  }

  toHTML(){
    return `
      <aside class="${this.className} ${this.className}-hidden">
        <form action="#" class="${this.className}__form">
          <h3 class="${this.className}__title">Find members</h3>
          <label for="nick" class="${this.className}__label">
            <h4 class="${this.className}__filter-caption">Nickname</h4>
            <input type="text" id="nick" class="${this.className}__input" name="nick" placeholder="knightrider82">
          </label>
          <label for="membername" class="${this.className}__label">
            <h4 class="${this.className}__filter-caption">Name</h4>
            <input type="text" id="membername" class="${this.className}__input" name="name" placeholder="David Hasselhoff">
          </label>
          <label for="gender" class="${this.className}__label">
            <h4 class="${this.className}__filter-caption">Gender</h4>
            <select id="gender" class="${this.className}__select" name="gender">
              <option value="">Any</option>
              <option value="male">Man</option>
              <option value="female">Woman</option>
            </select>
          </label>
          <h4 class="${this.className}__filter-caption">Age</h4>
          <label for="agefrom" class="${this.className}__label">
            from <input type="number" id="agefrom" class="${this.className}__input ${this.className}__input-small" name="agefrom" placeholder="0">
          </label>
          <label for="ageto" class="${this.className}__label">
            to <input type="number" id="ageto" class="${this.className}__input ${this.className}__input-small" name="ageto" placeholder="0">
          </label>
          <label for="email" class="${this.className}__label">
            <h4 class="${this.className}__filter-caption">Email</h4>
            <input type="text" id="email" class="${this.className}__input" name="email" placeholder="knightrider82@retro.com">
          </label>
          <label for="city" class="${this.className}__label">
            <h4 class="${this.className}__filter-caption">City</h4>
            <input type="text" id="city" class="${this.className}__input" name="city" placeholder="Los Angeles">
          </label>
          <h3 class="${this.className}__title">Sort members</h3>
          <h4 class="${this.className}__filter-caption">Nick</h4>
          <label for="a-first" class="${this.className}__label">
            <input type="radio" id="a-first" class="${this.className}__radio" name="sort" value="az" checked> A-Z
          </label>
          <label for="z-first" class="${this.className}__label">
            <input type="radio" id="z-first" class="${this.className}__radio" name="sort" value="za"> Z-A
          </label>
          <h4 class="${this.className}__filter-caption">Name</h4>
          <label for="a-name-first" class="${this.className}__label">
            <input type="radio" id="a-name-first" class="${this.className}__radio" name="sort" value="azname"> A-Z
          </label>
          <label for="z-name-first" class="${this.className}__label">
            <input type="radio" id="z-name-first" class="${this.className}__radio" name="sort" value="zaname"> Z-A
          </label>
          <h4 class="${this.className}__filter-caption">Age</h4>
          <label for="young-first" class="${this.className}__label">
            <input type="radio" id="young-first" class="${this.className}__radio" name="sort" value="yo"> Young
          </label>
          <label for="old-first" class="${this.className}__label">
            <input type="radio" id="old-first" class="${this.className}__radio" name="sort" value="oy"> Old
          </label>
          <h4 class="${this.className}__filter-caption">Experience</h4>
          <label for="oldfag" class="${this.className}__label">
            <input type="radio" id="oldfag" class="${this.className}__radio" name="sort" value="on"> Oldfag
          </label>
          <label for="newfag" class="${this.className}__label">
            <input type="radio" id="newfag" class="${this.className}__radio" name="sort" value="no"> Newfag
          </label>
        </form>
      </aside>
    `
  }

  init() {
    this.$element = document.querySelector(`.${this.className}`);
    this.$inputs.filters = Array.from(this.$element.querySelectorAll('input[type=text],input[type=number],select'))
      .reduce((filters, $input) => {
        filters[$input.name] = $input;
        return filters;
      }, {});
    this.$inputs.sorts = Array.from(this.$element.querySelectorAll('input[type=radio]'))
      .reduce((sorts, $radio) => {
        sorts[$radio.value] = $radio;
        return sorts;
      }, {});
    this.$element.addEventListener('input', this.onInput.bind(this));
    this.$button.addEventListener('click', () => {
      this.$element.classList.toggle(`${this.className}-hidden`);
      document.body.classList.toggle('blocked');
    });
    this.getOptionsFromURL();
    this.showOptions();
    this.observer.subscribe('feedloaded', () => {
      this.setURL();
      this.observer.emit('optionschange', this.options);
    });
    this.observer.subscribe('pageselected', (pageNumber) => {
      this.options.page = pageNumber;
      this.setURL();
    });
  }

  setURL() {
    const baseURL = new URL('', document.location.href);
    const pageString = Number(this.options.page) ? `?page=${this.options.page}` : ``;
    const filtersList = Object.entries(this.options.filters).map(([filter, value]) => `?${filter}=${value}`).join('');
    const currentAddress = new URL(`${pageString}${filtersList}?sort=${this.options.sort}`, baseURL);
    window.history.pushState(null, null, currentAddress.href);
  }

  getOptionsFromURL() {
    const hrefOptions = document.location.href.split('?').slice(1);
    for (let hrefOption of hrefOptions) {
      let [key, value] = hrefOption.split('=');
      if (key == 'sort') this.options.sort = value;
      else if (key == 'page') this.options.page = value;
      else this.options.filters[key] = value;
    }
  }

  showOptions() {
    for (let filter in this.options.filters) {
      this.$inputs.filters[filter].value = this.options.filters[filter];
    }
    for(let radio in this.$inputs.sorts) {
      if(radio == this.options.sort) this.$inputs.sorts[radio].setAttribute('checked','');
      else this.$inputs.sorts[radio].removeAttribute('checked');
    }
  }

  onInput({target}) {
    if (target.name == 'sort') {
      this.options.sort = target.value;
    } else {
      if (target.value) this.options.filters[target.name] = target.value;
      else delete this.options.filters[target.name];
      this.options.page = '0';
    }
    this.setURL();
    this.observer.emit('optionschange', this.options);
  }
}
