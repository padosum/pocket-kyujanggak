import App from './app'
import SearchList from './components/SearchList'
import ReadingList from './components/ReadingList'
import parseHTML from './helpers/parse-html'
import search from './search'
import { getBooks, setBooks } from './storage'

// import './style/reset.css'
import './style/style.css'
const tag = '[main]'

let currentPage = 1
let reRender = false 

function handlePageChange({ path }) {
	const anchor = path[0]
	let page = Number(anchor.value)
	if (Number.isNaN(page)) { // first, last button 
		page = path[1].value
	}
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
			component = parseHTML(`<main>${SearchList(query, updatedSearchedList)}</main>`)
			app.render(component)
		})
	} else if (window.location.pathname === '/readinglist') {
		const readingList = JSON.parse(localStorage.getItem('books')).filter(book => book.is_listed)
		component = parseHTML(`<main>${ReadingList(readingList)}</main>`)
		const app = App()
		app.render(component)
	} else {
		const app = App()
		app.render(parseHTML(`<main>
     <p class="information">
      도서명을 검색하면 영도 도서관의 도서 소장 정보와 대출 상태를 확인할 수 있습니다.<br>
      대출 가능 여부는 조회일 기준 전날 대출 상태를 기준으로 합니다.
    </p></main>`))
	}
}

init()
