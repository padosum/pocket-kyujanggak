import store from './store/index'
import { initRoutes } from './router'
import { $ } from './helpers/utils'
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
    return
  })
}

const init = () => {
  store.cleanSavedBooks()

  initRoutes()
  setEvent()
}

init()
