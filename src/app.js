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

const getLibraryInfo = async (list) => {
  return await Promise.allSettled(
    // 도서 목록의 소장여부/대출상태 조회하기
    list.map(async ({ isbn }) => {
      const [, isbn13] = isbn.split(' ')
      return await BookApi.getBookStatus(isbn13)
    })
  )
    .then((results) => {
      return list.filter((v, i) => {
        const {
          status,
          value: {
            response: { error, result },
          },
        } = results[i]

        // api로 가져온 도서의 소장여부/대출상태 업데이트
        if (error === undefined && status === 'fulfilled') {
          const { hasBook, loanAvailable } = result
          return {
            ...v,
            hasBook,
            loanAvailable,
          }
        }
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

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

const renderBookStatus = (books) => {
  // update ui
  books.forEach((v, i) => {
    const statusBox = $(`div[data-isbn='${v.isbn}']`)
    if (statusBox !== undefined) {
      while (statusBox.hasChildNodes()) {
        statusBox.removeChild(statusBox.lastChild)
      }
      statusBox.appendChild(parseHTML(StatusBox(books[i])))
    }

    const infoButtonWrap = $(`button[data-isbn='${v.isbn}']`).closest('div')
    if (infoButtonWrap !== undefined) {
      while (infoButtonWrap.hasChildNodes()) {
        infoButtonWrap.removeChild(infoButtonWrap.lastChild)
      }
      infoButtonWrap.appendChild(parseHTML(ButtonBox(books[i])))
    }
  })
}

const updateBookStatus = (updatedBooks) => {
  let savedBooks = store.getLocalStorage()

  return savedBooks.map((book) => {
    const idx = updatedBooks.findIndex((b) => b.isbn === book.isbn)

    if (idx !== -1) {
      return { ...updatedBooks[idx], updated: getToday() }
    } else {
      return book
    }
  })
}

const checkBookStatus = ({ bookList }) => {
  // update 날짜가 오늘이 아닌 경우 조회
  const shouldUpdateList = bookList.filter((book) => {
    return book.updated !== getToday()
  })

  // 대출 상태를 조회할 책 목록이 있다면
  if (shouldUpdateList.length > 0) {
    getLibraryInfo(shouldUpdateList)
      .then((response) => {
        // 저장된 값을 현재 날짜로 업데이트 하기
        const updatedBooks = updateBookStatus(response)
        store.setLocalStorage(updatedBooks)

        renderBookStatus(response)
      })
      .catch((err) => {
        console.error(err)
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
        checkBookStatus(props)
        $('main').appendChild(Paginator(props))
      }
      $app.appendChild(parseHTML(Foooter()))
    },
  }
}
