export default function Paginator(props) {
  const { pages, currentPage } = props
  const maxPage = 5
  const booksPerPage = 10
  //* api 호출 최댓값 100페이지
  const pagesCount =
    Math.ceil(pages / booksPerPage) > 100
      ? 100
      : Math.ceil(pages / booksPerPage)

  let maxLeft = currentPage - Math.floor(maxPage / 2)
  let maxRight = currentPage + Math.floor(maxPage / 2)

  if (maxLeft < 1) {
    maxLeft = 1
    maxRight = maxPage
  }

  if (maxRight > pagesCount) {
    maxLeft = pagesCount - (maxPage - 1)
    maxRight = pagesCount

    if (maxLeft < 1) {
      maxLeft = 1
    }
  }

  if (pagesCount < 2) {
    maxLeft = 1
    maxRight = 1
  }

  if (currentPage === pagesCount) {
    maxLeft = currentPage > maxPage ? pagesCount - maxPage + 1 : 1
    maxRight = pagesCount
  }

  const pagination = document.createElement('div')
  pagination.className = 'pagination'

  if (pagesCount >= maxPage) {
    const first = document.createElement('a')
    first.className = 'first page_number'
    first.dataset.page = 1
    // first.addEventListener('click', () => handlePageChange(1))
    first.innerHTML = `<i class="fa-solid fa-angles-left pointer-none"></i>`
    pagination.appendChild(first)
  }

  for (let i = maxLeft; i <= maxRight; i++) {
    const pageNumber = document.createElement('a')
    pageNumber.classList.add('page_number')
    if (currentPage === i) {
      pageNumber.classList.add('active')
    }
    pageNumber.dataset.page = i
    // pageNumber.onclick = 'handlePageChange'
    // pageNumber.addEventListener('click', () => handlePageChange(i))
    pageNumber.innerText = i
    pagination.appendChild(pageNumber)
  }

  if (pagesCount >= maxPage) {
    const last = document.createElement('a')
    last.className = 'last page_number'
    last.dataset.page = pagesCount
    // last.addEventListener('click', () => handlePageChange(pagesCount))
    last.innerHTML = `<i class="fa-solid fa-angles-right pointer-none"></i>`
    pagination.appendChild(last)
  }

  return pagination
}
