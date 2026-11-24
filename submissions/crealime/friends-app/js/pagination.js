export default class Pagination {
  constructor(glob) {
    this.GLOB = glob
  }

  changePage(page) {
    this.GLOB.currentPage = page
    this.GLOB.friends.renderFriends(this.GLOB.friends.personsEdit, page)
    this.setCurrentPageToInput()
    this.GLOB.baseURL.searchParams.set('page', page)
    this.GLOB.filters.setHistory()
  }

  listToPreviousPage() {
    if (this.GLOB.currentPage > 1) {
      this.GLOB.currentPage --
      this.changePage(this.GLOB.currentPage)
    }
  }

  listToNextPage() {
    if (this.GLOB.currentPage < this.GLOB.friends.personsEdit.length / this.GLOB.cardsOnPage) {
      this.GLOB.currentPage ++
      this.changePage(this.GLOB.currentPage)
    }
  }

  listToThisPage(e) {
    const page = e.target.value
    if (page > 0 && page <= this.GLOB.friends.personsEdit.length / this.GLOB.cardsOnPage) {
      this.changePage(page)
    }
    else if (page > this.GLOB.friends.personsEdit.length / this.GLOB.cardsOnPage) {
      this.changePage(Math.ceil(this.GLOB.friends.personsEdit.length / this.GLOB.cardsOnPage))
    }
    else {
      this.changePage(1)
    }
  }

  setCurrentPageToInput() {
    this.GLOB.paginationInput.value = this.GLOB.currentPage
  }
}
