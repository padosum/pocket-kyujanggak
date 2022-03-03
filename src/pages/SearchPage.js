import BookApi from '../api'
import store from '../store'
import App from '../app'
import parseHTML from '../helpers/parse-html'
import SearchList from '../components/SearchList'
import Paginator from '../components/Paginator'

let currentPage = 1
let reRender = false

function handlePageChange(page) {
  if (currentPage !== page) reRender = true
  currentPage = page
  reRender && SearchPage()
  reRender = false
}

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

const SearchPage = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const query = params.q

  const search = async (query, page) => {
    try {
      return await BookApi.getBookList({ query, page })
    } catch (err) {
      console.error(err)
    }
  }
  // 책 검색
  search(query, currentPage)
    .then((data) => {
      const pages = data.meta.total_count
      const isPageEnd = data.meta.is_end

      if (pages > 0) {
        const { documents: searchedResult } = data
        const bookList = updateBookList(searchedResult)
        saveSearchedList(searchedResult)

        const app = App({
          bookList,
          pages,
          handlePageChange,
          currentPage,
          isPageEnd,
        })

        const component = parseHTML(
          `<main>
            ${SearchList(query, bookList)}
            ${Paginator({ pages, currentPage }).outerHTML}
          </main>`
        )
        app.render(component)
      } else {
        App().render(
          parseHTML(`<main>${query}에 대한 도서 검색 결과가 없습니다.</main>`)
        )
      }
    })
    .catch((e) => {
      console.error(e)
      App().render(parseHTML(`<main>도서 검색 중 오류가 발생했습니다.</main>`))
    })
}

export default SearchPage
