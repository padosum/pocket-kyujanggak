import App from '../app'
import parseHTML from '../helpers/parse-html'
import ReadingList from '../components/ReadingList'
import store from '../store'

const ReadingListPage = () => {
  const readingList = (store.getLocalStorage() ?? []).filter(
    (book) => book.is_listed
  )
  const app = App({ bookList: readingList })
  const component = parseHTML(`<main>${ReadingList(readingList)}</main>`)
  app.render(component)
}

export default ReadingListPage
