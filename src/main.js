import store from './store/index'
import { routes } from './router'
import { $, contentRender } from './helpers/utils'
import Header from './components/Header'
import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'

import './style/normalize.css'
import './style/shared/modules/layout.css'
import './style/shared/modules/flex.css'
import './style/shared/modules/spacing.css'
import './style/shared/modules/sizing.css'
import './style/style.css'

const setEvent = () => {
  document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('dd-btn')) {
      const dropdowns = [...document.getElementsByClassName('dd-btn')]
      dropdowns.forEach((dropdown) => {
        if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show')
        }
      })
    }
  })

  window.addEventListener('scroll', () => {
    const $top = $('.top')
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      $top.style.display = 'block'
    } else {
      $top.style.display = 'none'
    }
  })
}

const initRender = async (router = PageNotFound) => {
  const header = null || $('#header_container')
  const footer = null || $('#footer_container')

  // Render Header, Footer
  header.outerHTML = await Header.render()
  await Header.after_render()
  footer.outerHTML = Footer()

  // Render Content
  contentRender(router)
}

const initRoutes = () => {
  initRender(routes[window.location.pathname])
  window.onpopstate = () => {
    contentRender(routes[window.location.pathname])
  }
}

const init = () => {
  store.cleanSavedBooks()

  initRoutes()
  setEvent()
}

init()
