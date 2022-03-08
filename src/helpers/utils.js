import PageNotFound from '../pages/PageNotFound'

const getToday = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

const cutString = (str, length) => {
  return str.slice(0, length).concat('...')
}

const $ = (selector) => document.querySelector(selector)

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
export { getToday, cutString, $, contentRender }
