export default function Paginator(props) {
	const {handlePageChange, pages, currentPage, isPageEnd} = props
	const maxPage = 5
	const booksPerPage = 10
	const pagesCount = Math.ceil(pages / booksPerPage)
	console.log(`currentPage`, currentPage)
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

	const pagination = document.createElement('ul')
	pagination.className = 'pagination'
	
	if (pagesCount >= maxPage) {
		const li = document.createElement('li')
		const first = document.createElement('a')
		first.className = 'first page_number'
		first.onclick = handlePageChange
		first.value = 1
		first.innerHTML = `<i class="fa-solid fa-angles-left"></i>`
		li.appendChild(first)
		pagination.appendChild(li)
	}
	
	console.log(`maxLeft`, maxLeft, `maxRight`, maxRight)
	for (let i = maxLeft; i <= maxRight; i++) {
		const li = document.createElement('li')
		const pageNumber = document.createElement('a')
		pageNumber.classList.add('page_number')
		if (currentPage === i) {
			pageNumber.classList.add('active')
		}
		pageNumber.onclick = handlePageChange
		pageNumber.innerText = i
		pageNumber.value = i
		li.appendChild(pageNumber)
		pagination.appendChild(li)
	}
  
	if (pagesCount >= maxPage) {
		const li = document.createElement('li')
		const last = document.createElement('a')
		last.className = 'last page_number'
		last.onclick = handlePageChange
		last.innerHTML = `<i class="fa-solid fa-angles-right"></i>`
		last.value = pagesCount
		li.appendChild(last)
		pagination.appendChild(li)
	}
  
	return pagination 
}