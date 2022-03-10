/* eslint-disable no-param-reassign */
let lazyloadThrottleTimeout
function lazyload() {
  const lazyloadImages = document.querySelectorAll('img.lazy')

  if (lazyloadThrottleTimeout) {
    clearTimeout(lazyloadThrottleTimeout)
  }

  lazyloadThrottleTimeout = setTimeout(() => {
    const scrollTop = window.pageYOffset
    lazyloadImages.forEach((img) => {
      if (img.offsetTop < window.innerHeight + scrollTop) {
        img.src = img.dataset.src
        img.classList.remove('lazy')
        img.alt = img.dataset.alt
      }
    })
    if (lazyloadImages.length === 0) {
      document.removeEventListener('scroll', lazyload)
      window.removeEventListener('resize', lazyload)
      window.removeEventListener('orientationChange', lazyload)
    }
  }, 20)
}

const setLazyLoad = () => {
  document.addEventListener('scroll', lazyload)
  window.addEventListener('resize', lazyload)
  window.addEventListener('orientationChange', lazyload)
}

export default setLazyLoad
