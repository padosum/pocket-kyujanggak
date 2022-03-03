import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import PageNotFound from './pages/PageNotFound'
import store from './store/index'

import './style/style.css'
import { getToday } from './helpers/utils'
import ReadingListPage from './pages/ReadingListPage'

const cleanSavedBooks = () => {
  if (store.getUpdatedDate() !== getToday()) {
    store.clearLocalStorage()
    store.setUpdateDate()
  }
}

const routes = {
  '/': Home,
  '/search': SearchPage,
  '/readinglist': ReadingListPage,
}

const renderPage = (viewPage = PageNotFound) => {
  viewPage()
}

const init = () => {
  cleanSavedBooks()

  const { pathname } = window.location
  renderPage(routes[pathname])
}

init()
