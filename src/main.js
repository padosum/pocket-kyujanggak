import App from './app'
import SearchList from './components/SearchList'
import ReadingList from './components/ReadingList'
import parseHTML from './helpers/parse-html'
import search from './search'
import { getBooks, setBooks } from './storage'

import './style.css'
const tag = '[main]'

let currentPage = 1
let reRender = false 

function handlePageChange({ path }) {
	const page = Number(path[0].value)
	if (currentPage !== page) reRender = true
	currentPage = page 
	reRender && init() 
	reRender = false 
}


const init = () => {

	let component
  
	if (window.location.search) {
		const urlSearchParams = new URLSearchParams(window.location.search)
		const params = Object.fromEntries(urlSearchParams.entries())
		const query = params.q
    
		// 책 검색 
		search(query, currentPage).then(response => {
			const pages = response.data.meta.total_count
			const isPageEnd = response.data.meta.is_end
			const savedBooks = getBooks()

			let searchedList = response.data.documents
			let updatedSearchedList
      
			// 저장된 데이터가 없으면 새로 저장하기 
			if (savedBooks === null) {
				setBooks(searchedList)
				updatedSearchedList = searchedList
			}
			// 이미 저장된 데이터가 있다면 
			else {
				updatedSearchedList = searchedList.map(book => {
					// 없는 데이터만 추가로 저장하기
					const idx = savedBooks.findIndex(b => b.isbn === book.isbn)
					if (idx !== -1) { 
						return savedBooks[idx]
					} else { 
						return book
					} 
				})
        
				console.log(`updatedSearchedList`,updatedSearchedList)

				const newBooks = searchedList.filter(book => {
					const idx = savedBooks.findIndex(b => b.isbn === book.isbn)
					return idx === -1 
				})
        
				const newSaveList = [...savedBooks, ...newBooks]
				setBooks(newSaveList)
			}
			const app = App({ updatedSearchedList, pages, handlePageChange, currentPage, isPageEnd })
			component = parseHTML(SearchList(updatedSearchedList))
			app.render(component)
		})
	} else if (window.location.pathname === '/readinglist') {
		const readingList = JSON.parse(localStorage.getItem('books')).filter(book => book.is_listed)
		component = parseHTML(ReadingList(readingList))
		const app = App()
		app.render(component)
	} else {
		const app = App()
		app.render()
	}
}

init()
