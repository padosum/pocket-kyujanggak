import store from '../store'
import List from '../components/List'
import { $ } from '../helpers/utils'
import toggleReadingList from '../toggleReadingList'
import Skeleton from '../components/Skeleton'

const ReadingList = {
  bookList: [],
  async render() {
    const readingList = (store.getLocalStorage() ?? []).filter(
      (book) => book.isListed
    )
    this.bookList = readingList

    if (readingList.length === 0) {
      return `읽기 목록에 도서가 없습니다.`
    }

    return `${List(readingList, '읽기 목록')}`
  },
  before_render: async () => {
    return Skeleton(10)
  },
  async after_render() {
    if (this.bookList.length > 0) {
      $('.list').addEventListener('click', (e) => {
        // 읽기 목록 추가
        if (e.target.classList.contains('reading_btn')) {
          e.target.innerText = toggleReadingList(e.target)
          return
        }

        // 희망도서 신청
        if (e.target.classList.contains('dd-btn')) {
          e.target.classList.toggle('show')
        }
      })
    }
  },
}

export default ReadingList
