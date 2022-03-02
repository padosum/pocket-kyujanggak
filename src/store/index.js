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
  clearLocalStorage() {
    localStorage.removeItem('books')
  },
}

export default store
