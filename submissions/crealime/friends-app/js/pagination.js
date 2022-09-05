export default class Pagination {
  constructor(glob) {
    this.glob = glob
  }

  changePage(page) {
    this.glob.currentPage = page
    this.glob.friends.renderFriends(this.glob.friends.personsEdit, page)
    this.setCurrentPageToInput()
    this.glob.baseURL.searchParams.set('page', page)
    this.glob.filters.setHistory()
  }

  listToPreviousPage() {
    if (this.glob.currentPage > 1) {
      this.glob.currentPage --
      this.changePage(this.glob.currentPage)
    }
  }

  listToNextPage() {
    if (this.glob.currentPage < this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.glob.currentPage ++
      this.changePage(this.glob.currentPage)
    }
  }

  listToThisPage(e) {
    const page = e.target.value
    if (page > 0 && page <= this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.changePage(page)
    }
    else if (page > this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.changePage(Math.ceil(this.glob.friends.personsEdit.length / this.glob.cardsOnPage))
    }
    else {
      this.changePage(1)
    }
  }

  setCurrentPageToInput() {
    this.glob.paginationInput.value = this.glob.currentPage
  }
}
