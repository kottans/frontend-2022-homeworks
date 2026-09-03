export default class Error {
  constructor(message) {
    this.message = message
  }

  getErrorTemplate() {
    return `
      <div class="error">
        <div class="error__message">${this.message}</div>
      </div>
    `
  }

  showError() {
    document.body.insertAdjacentHTML('afterbegin', this.getErrorTemplate())
    return document.querySelector('.error')
  }
}