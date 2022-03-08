import BookApi from '../api'
import store from '../store'
import List from '../components/List'
import Paginator from '../components/Paginator'
import StatusBox from '../components/StatusBox'
import ButtonBox from '../components/ButtonBox'
import { $, getToday } from '../helpers/utils'
import { contentRender } from '../router'
import toggleReadingList from '../toggleReadingList'
const updateBookList = (searchedList) => {
  const savedBooks = store.getLocalStorage()

  // 저장된 데이터가 없는 경우
  if (savedBooks === null) {
    return searchedList
  }

  return searchedList.map((book) => {
    // 도서가 기존에 저장이 되었다면 저장된 데이터 가져오기
    // NOTE 오늘 이미 조회한 도서라면 상태 조회 API를 요청하지 않기 위해서
    const idx = savedBooks.findIndex((b) => b.isbn === book.isbn)
    if (idx !== -1) {
      return savedBooks[idx]
    } else {
      return book
    }
  })
}

const renderBookStatus = (book) => {
  // update ui
  const statusBox = $(`div[data-isbn='${book.isbn}']`)

  if (statusBox) {
    statusBox.innerHTML = StatusBox(book)
  }

  const infoButton = $(`button[data-isbn='${book.isbn}']`)
  if (infoButton) {
    const infoButtonWrap = infoButton.closest('div')
    infoButtonWrap.innerHTML = ButtonBox(book)
  }
}

const updateDate = (updatedBooks) => {
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
      bookMap.set(book.isbn, book)

      // 대출 상태 가져오기
      const [, isbn13] = book.isbn.split(' ')
      let { response } = await BookApi.getBookStatus(isbn13)
      if (response.error) {
        console.error(response)
      }

      const { hasBook, loanAvailable } = response.result

      // 도서 상태 ui 업데이트
      renderBookStatus({
        ...bookMap.get(book.isbn),
        hasBook,
        loanAvailable,
      })

      // 도서 상태 정보 저장
      store.setLocalStorage(
        updateDate({
          ...bookMap.get(book.isbn),
          hasBook,
          loanAvailable,
        })
      )
    })
  }
}

const saveSearchedList = (searchedList) => {
  const savedBooks = store.getLocalStorage()

  // 저장된 데이터가 없으면 새로 저장
  if (savedBooks === null) {
    store.setLocalStorage(searchedList)
    return
  }

  // 검색한 도서 중 저장이 되지 않은 도서 추가 저장
  const newBooks = searchedList.filter((book) => {
    const idx = savedBooks.findIndex((b) => b.isbn === book.isbn)
    return idx === -1
  })

  const newSaveList = [...savedBooks, ...newBooks]
  store.setLocalStorage(newSaveList)
}

const SearchList = {
  bookList: [],
  searchQuery: '',
  currentPage: 1,
  async search(query, page) {
    try {
      const data = await BookApi.getBookList({ query, page })
      const pages = data.meta.total_count
      console.log(`this`, this)

      if (pages > 0) {
        const { documents: searchedResult } = data
        this.bookList = updateBookList(searchedResult)
        saveSearchedList(searchedResult)

        return `
            ${List(this.bookList, `'${query}' 검색 결과`)}
            ${Paginator(pages, this.currentPage).outerHTML}`
      } else {
        return `${query}에 대한 도서 검색 결과가 없습니다.`
      }
    } catch (err) {
      console.error(`Errrrr`, err)
      return `도서 검색 중 오류가 발생했습니다.`
    }
  },
  async render() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    const query = params.q

    if (this.searchQuery !== query) {
      this.currentPage = 1
    }
    this.searchQuery = query

    // 책 검색
    console.log(query, this.currentPage)
    const view = await this.search(query, this.currentPage)
    return view
  },
  async before_render() {
    this.currentPage = 1
    this.searchQuery = ''
  },
  async after_render() {
    console.log(`SearchList`, `after_render`)
    // 도서 대출 상태 조회하기
    checkBookStatus(this)

    $('.list').addEventListener('click', (e) => {
      if (e.target.classList.contains('reading_btn')) {
        toggleReadingList(e.target)
        return
      }

      // 희망도서 신청
      if (e.target.classList.contains('dd-button')) {
        e.target.classList.toggle('show')
        return
      }
    })

    $('.pagination').addEventListener('click', (e) => {
      if (e.target.classList.contains('page_number')) {
        this.handlePageChange(Number(e.target.dataset.page))
      }
    })
  },

  async handlePageChange(page) {
    if (this.currentPage !== page) {
      this.currentPage = page
      contentRender(this)
    }
  },
}

export default SearchList
