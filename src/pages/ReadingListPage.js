import App from '../app'
import store from '../store'
import parseHTML from '../helpers/parse-html'
import ReadingList from '../components/ReadingList'

const ReadingListPage = () => {
  const readingList = (store.getLocalStorage() ?? []).filter(
    (book) => book.is_listed
  )
  const app = App({ bookList: readingList })
  const component = parseHTML(`<main>${ReadingList(readingList)}</main>`)
  app.render(component)
}

export default ReadingListPage
