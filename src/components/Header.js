import { $ } from '../helpers/utils'
import { historyRouterPush } from '../router'
const Header = {
  render: async () => {
    const view = `
      <div class="header_img_wrap pt-2">
          <div class="header_img h-100">
          </div>
      </div>
      <header class="sticky d-flex flex-col items-center pt-1">
        <a class="js-nav" href="/"><h1 class="title mt-1 p-2 primary-shadow pointer-none">포켓 규장각</h1></a>
        <div class="header-contents d-flex justify-center">
          <div class="search_form d-flex items-center mr-2">
            <input class="primary-shadow mr-2 p-1" id="query" type="text" placeholder="도서명" aria-label="도서명 검색"/>
          </div>
          <nav class="d-flex items-center">
            <a class="js-nav reading_list primary-shadow p-1" href="/readinglist" title="읽기 목록"><i class="fa-solid fa-bookmark pointer-none"></i></a>
          </nav>
        </div>
      </header>
      `
    return view
  },
  after_render: async () => {
    $('header').addEventListener('click', (e) => {
      if (e.target.classList.contains('js-nav')) {
        e.preventDefault()
        const path = e.target.getAttribute('href')
        const url = new URL(window.location.origin + path)
        historyRouterPush(url, {
          resetPage: true,
        })
      }
    })

    $('#query').addEventListener('keypress', (e) => {
      const {
        key,
        target: { value },
      } = e

      if (key === 'Enter' && value.trim() !== '') {
        e.target.value = ''
        const url = new URL(window.location.origin + '/search')
        url.searchParams.set('q', value)
        historyRouterPush(url, {
          resetPage: true,
        })
      }
      return
    })
  },
}

export default Header
