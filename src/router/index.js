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
const historyRouterPush = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName)
  contentRender(routes[pathName])
}

const contentRender = async (router = PageNotFound) => {
  const content = null || $('#content_container')

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

  await router.before_render()
  contentRender(router)
}

export { initRoutes, historyRouterPush, contentRender, initRender }
