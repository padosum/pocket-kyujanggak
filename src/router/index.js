import Home from '../pages/Home'
import SearchList from '../pages/SearchList'
import ReadingList from '../pages/ReadingList'
import PageNotFound from '../pages/PageNotFound'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { $ } from '../helpers/utils'

const routes = {
  '/': Home,
  '/search': SearchList,
  '/readinglist': ReadingList,
}

// entry point
const initRoutes = () => {
  initRender(routes[window.location.pathname])
  window.onpopstate = () => {
    contentRender(routes[window.location.pathname])
  }
}

// set browser history
const historyRouterPush = ({ pathname, search }, options) => {
  window.history.pushState({}, '', window.location.origin + pathname + search)
  contentRender(routes[pathname], options)
}

const contentRender = async (
  router = PageNotFound,
  options = { resetPage: false }
) => {
  const content = null || $('#content_container')

  content.innerHTML = await router.before_render(options)

  content.innerHTML = await router.render()
  await router.after_render()

  // 페이지 이동시 스크롤 최상단으로 가기 위함
  document.scrollingElement.scrollTop = 0
}

const initRender = async (router = PageNotFound) => {
  const header = null || $('#header_container')
  const footer = null || $('#footer_container')

  // Render Header, Footer
  header.outerHTML = await Header.render()
  await Header.after_render()
  footer.outerHTML = Footer()

  contentRender(router)
}

export { initRoutes, historyRouterPush, contentRender, initRender }
