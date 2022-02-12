export default function Paginator(props) {
	const {handlePageChange, pages, currentPage, isPageEnd} = props
	const maxPage = 5
	const booksPerPage = 10
	const pagesCount = Math.ceil(pages / booksPerPage)

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
		const first = document.createElement('button')
		first.className = 'first'
		first.onclick = handlePageChange
		first.innerText = `first`
		pagination.appendChild(first)
	}
	
  
	for (let i = maxLeft; i <= maxRight; i++) {
		const button = document.createElement('button')
		button.onclick = handlePageChange
		button.innerText = i
		button.value = i
		pagination.appendChild(button)
	}
  
	if (pagesCount >= maxPage) {
		const last = document.createElement('button')
		last.className = 'last'
		last.onclick = handlePageChange
		last.innerText = `last`
		last.value = pagesCount
		pagination.appendChild(last)
	}
  
	return pagination 
}