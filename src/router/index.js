import Home from '../pages/Home'
import SearchList from '../pages/SearchList'
import ReadingList from '../pages/ReadingList'
import { contentRender } from '../helpers/utils'

const routes = {
  '/': Home,
  '/search': SearchList,
  '/readinglist': ReadingList,
}

// set browser history
const historyRouterPush = ({ pathname, search }, options) => {
  window.history.pushState({}, '', window.location.origin + pathname + search)
  contentRender(routes[pathname], options)
}

export { historyRouterPush, routes }
