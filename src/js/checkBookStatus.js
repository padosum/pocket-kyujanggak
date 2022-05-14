import { Notyf } from 'notyf'
import StatusBox from '../components/StatusBox'
import ButtonBox from '../components/ButtonBox'
import store from '../store'
import BookApi from '../api'
import { getToday, $ } from '../helpers/utils'

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
  const savedBooks = store.getLocalStorage()

  return savedBooks.map((book) => {
    return book.isbn === updatedBooks.isbn
      ? { ...updatedBooks, updated: getToday() }
      : book
  })
}

const checkBookStatus = async ({ bookList }) => {
  // update 날짜가 오늘이 아닌 경우 조회
  const shouldUpdateList = bookList.filter((book) => {
    return book.updated !== getToday()
  })
  // 대출 상태를 조회할 책 목록이 있다면
  if (shouldUpdateList.length > 0) {
    const bookMap = new Map()
    try {
      await Promise.all(
        shouldUpdateList.map(async (book) => {
          let hasBook = 'N'
          let loanAvailable = 'N'
          try {
            bookMap.set(book.isbn, book)

            // 대출 상태 가져오기
            const [, isbn13] = book.isbn.split(' ')
            const { response } = await BookApi.getBookStatus(isbn13)

            if (!response.error) {
              hasBook = response.result.hasBook
              loanAvailable = response.result.loanAvailable
            } else {
              throw new Error(response.error)
            }
          } catch (err) {
            throw new Error(err)
          } finally {
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
          }
        })
      )
    } catch (err) {
      const notyf = new Notyf({
        dismissible: true,
      })
      notyf.error('데이터 조회 중 오류가 발생했습니다.')
      console.error(err)
    }
  }
}

export default checkBookStatus
