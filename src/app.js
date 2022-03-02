import Header from './components/Header'
import Foooter from './components/Footer'
import StatusBox from './components/StatusBox'
import parseHTML from './helpers/parse-html'
import Paginator from './components/Paginator'
import store from './store/index'
import { getToday, $ } from './helpers/utils'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import ButtonBox from './components/ButtonBox'
import BookApi from './api'

const search = () => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('q', $('#query').value)
    window.location = `/search?${searchParams.toString()}`
  }
}

const toggleBookData = (isbn) => {
  const savedBooks = store.getLocalStorage()
  return savedBooks.map((book) => {
    return book.isbn === isbn ? { ...book, is_listed: !book.is_listed } : book
  })
}

const removeReadingList = (isbn, cbFunc) => {
  if (!confirm('도서를 삭제하시겠습니까?')) {
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

const notyf = new Notyf({
  types: [
    {
      type: 'success',
      background: 'blue',
    },
  ],
  dismissible: true,
})

const toggleReadingList = (target) => {
  const text = target.innerText
  const { isbn } = target.dataset
  const isDeleted = text === '삭제하기'
  // 삭제하기 로직
  if (isDeleted) {
    removeReadingList(isbn, () => {
      if (window.location.pathname === '/readinglist') {
        target.closest('.card').remove()
      }
      target.innerText = `읽기 목록에 담기`
      notyf.success('읽기 목록에서 삭제되었습니다.')
    })
    return
  }

  addReadingList(isbn, () => {
    target.innerText = `삭제하기`
    notyf.success('읽기 목록에 담았습니다.')
  })
}

const setEvent = () => {
  const $query = $('#query')

  $query.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && $query.value.trim() !== '') {
      search()
    }
    return
  })

  document.body.addEventListener('click', ({ target }) => {
    if (target.classList.contains('search_btn')) {
      if ($query.value.trim() !== '') {
        search()
      }
      return
    }
    if (target.classList.contains('reading_btn')) {
      toggleReadingList(target)
      return
    }
  })
}

const renderBookStatus = (book) => {
  // update ui
  const statusBox = $(`div[data-isbn='${book.isbn}']`)
  if (statusBox) {
    while (statusBox.hasChildNodes()) {
      statusBox.removeChild(statusBox.lastChild)
    }
    statusBox.appendChild(parseHTML(StatusBox(book)))
  }
  const infoButton = $(`button[data-isbn='${book.isbn}']`)
  if (infoButton) {
    const infoButtonWrap = infoButton.closest('div')
    while (infoButtonWrap.hasChildNodes()) {
      infoButtonWrap.removeChild(infoButtonWrap.lastChild)
    }
    infoButtonWrap.appendChild(parseHTML(ButtonBox(book)))
  }
}

const updateBookStatus = (updatedBooks) => {
  let savedBooks = store.getLocalStorage()

  return savedBooks.map((book) => {
    return book.isbn === updatedBooks.isbn
      ? { ...updatedBooks, updated: getToday() }
      : book
  })
}

const checkBookStatus = ({ bookList }) => {
  // update 날짜가 오늘이 아닌 경우 조회
  let shouldUpdateList = bookList.filter((book) => {
    return book.updated !== getToday()
  })
  // 대출 상태를 조회할 책 목록이 있다면
  if (shouldUpdateList.length > 0) {
    const bookMap = new Map()
    shouldUpdateList.map(async (book) => {
      const [, isbn13] = book.isbn.split(' ')
      bookMap.set(isbn13, book)

      // 대출 상태 가져오기
      const { response } = await BookApi.getBookStatus(isbn13)
      if (response.error) {
        console.error(response)
        return
      }

      const { hasBook, loanAvailable } = response.result

      // 도서 상태 ui 업데이트
      renderBookStatus({
        ...bookMap.get(isbn13),
        hasBook,
        loanAvailable,
      })

      // 도서 상태 정보 저장
      store.setLocalStorage(
        updateBookStatus({
          ...bookMap.get(isbn13),
          hasBook,
          loanAvailable,
        })
      )
    })
  }
}

export default function App(props) {
  const $app = $('#app')
  return {
    render(component = parseHTML('')) {
      while ($app.hasChildNodes()) {
        $app.removeChild($app.lastChild)
      }
      $app.appendChild(parseHTML(Header()))
      $app.appendChild(component)

      setEvent()

      // 대출 상태 조회하기
      if ((window.location.pathname !== '/') & (props !== undefined)) {
        console.time('checkBookStatus')
        checkBookStatus(props)
        console.timeEnd('checkBookStatus')
        $('main').appendChild(Paginator(props))
      }
      $app.appendChild(parseHTML(Foooter()))
    },
  }
}
