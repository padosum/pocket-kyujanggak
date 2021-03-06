import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import store from '../store'
import { $ } from '../helpers/utils'

const toggleBookData = (isbn) => {
  const savedBooks = store.getLocalStorage()
  return savedBooks.map((book) =>
    book.isbn === isbn ? { ...book, isListed: !book.isListed } : book
  )
}

const removeReadingList = (isbn, cbFunc) => {
  // eslint-disable-next-line no-alert
  if (!window.confirm('도서를 삭제하시겠습니까?')) {
    return
  }
  store.setLocalStorage(toggleBookData(isbn))
  if (cbFunc) {
    cbFunc()
  }
}

const addReadingList = (isbn, cbFunc) => {
  store.setLocalStorage(toggleBookData(isbn))
  if (cbFunc) {
    cbFunc()
  }
}

const toggleReadingList = (target) => {
  const { isbn } = target.dataset
  const isDeleted = target.innerText === '삭제하기'

  const notyf = new Notyf({
    types: [
      {
        type: 'success',
        background: 'blue',
      },
    ],
    dismissible: true,
  })

  if (isDeleted) {
    removeReadingList(isbn, () => {
      if (window.location.pathname === '/readinglist') {
        target.closest('.card').remove()
        if (document.querySelectorAll('.card').length === 0) {
          $('#content_container').innerHTML = '읽기 목록에 도서가 없습니다.'
        }
      }
      notyf.success('읽기 목록에서 삭제되었습니다.')
    })
    return '읽기 목록에 담기'
  }

  addReadingList(isbn, () => {
    notyf.success('읽기 목록에 담았습니다.')
  })
  return '삭제하기'
}

export default toggleReadingList
