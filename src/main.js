import App from './app'
import SearchList from './components/SearchList'
import ReadingList from './components/ReadingList'
import parseHTML from './helpers/parse-html'
import search from './search'
import store from './store/index'

import './style/style.css'


let currentPage = 1
let reRender = false 

function handlePageChange(page) {
	if (currentPage !== page) reRender = true
	currentPage = page 
	reRender && init() 
	reRender = false 
}

const searchPage = () => {
	const urlSearchParams = new URLSearchParams(window.location.search)
	const params = Object.fromEntries(urlSearchParams.entries())
	const query = params.q
    
	// 책 검색 
	search(query, currentPage).then(response => {
		const pages = response.data.meta.total_count
		const isPageEnd = response.data.meta.is_end
      
		if(pages > 0) {
			const savedBooks = store.getLocalStorage()

			let searchedList = response.data.documents
			let updatedSearchedList
      
			// 저장된 데이터가 없으면 새로 저장하기 
			if (savedBooks === null) {
				store.setLocalStorage(searchedList)
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
        
				const newBooks = searchedList.filter(book => {
					const idx = savedBooks.findIndex(b => b.isbn === book.isbn)
					return idx === -1 
				})
        
				const newSaveList = [...savedBooks, ...newBooks]
				store.setLocalStorage(newSaveList)
			}
        
			const app = App({ updatedSearchedList, pages, handlePageChange, currentPage, isPageEnd })
			const component = parseHTML(`<main>${SearchList(query, updatedSearchedList)}</main>`)
			app.render(component)
		} else {
			App().render(parseHTML(`<main>${query}에 대한 도서 검색 결과가 없습니다.</main>`))
		}
	}).catch(err => console.log(err))
}

const readingListPage = () => {
	const readingList = (store.getLocalStorage() ?? []).filter(book => book.is_listed)
	const app = App({ updatedSearchedList: readingList  })
	const component = parseHTML(`<main>${ReadingList(readingList)}</main>`)
	app.render(component)
}

const init = () => {
	if (window.location.search) {
		searchPage()
	} else if (window.location.pathname === '/readinglist') {
		readingListPage()
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
