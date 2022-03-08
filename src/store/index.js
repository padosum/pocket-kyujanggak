import { getToday } from '../helpers/utils'

const store = {
  setLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books))
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('books'))
  },
  getUpdatedDate() {
    return localStorage.getItem('updated')
  },
  setUpdateDate() {
    localStorage.setItem('updated', getToday())
  },
  clearUnlistedBooks() {
    const savedBooks = this.getLocalStorage() ?? []
    this.setLocalStorage(savedBooks.filter((item) => item.is_listed))
  },
  cleanSavedBooks() {
    if (this.getUpdatedDate() !== getToday()) {
      this.clearUnlistedBooks()
      this.setUpdateDate()
    }
  },
}

export default store
