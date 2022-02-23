import Header from './components/Header'
import Foooter from './components/Footer'
import StatusBox from './components/StatusBox'
import parseHTML from './helpers/parse-html'
import axios from 'axios'
import Paginator from './components/Paginator'
import { getBooks, setBooks } from './storage'
import { getToday, $ } from './helpers/utils'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import ButtonBox from './components/ButtonBox'

const getLibraryInfo = async (list) => {
	console.time('promise')
	const formatList = await Promise.all(
		list.map(async (item) => { 
			const isbn13 = item.isbn.split(' ')[1]
			let response
			try {
				const authKey = import.meta.env.VITE_LIBRARY_API_KEY
				response = await axios({
					method: 'get',
					url: '/api/bookExist',
					params: {
						authKey,
						libCode: '121014', 
						isbn13,
						format: 'json',
					},
				})
			} catch (err) {
				return err
			}
			return response
		})
	).then((results) => {
		const existList = list.map((v, i) => {
			const { hasBook, loanAvailable } =
        results[i].data.response.error === undefined ? results[i].data.response.result : { hasBook: 'N', loanAvailable: 'N' }
			return {
				...v,
				hasBook,
				loanAvailable,
			}
		})
		return existList
	})

	console.timeEnd('promise')
	return formatList
}

const search = () => {
	const query = $('#query').value

	if ('URLSearchParams' in window) {
		const searchParams = new URLSearchParams(window.location.search)
		searchParams.set('q', query)
		window.location = `/search?${searchParams.toString()}`
	}
}

const setEvent = () => {
	const $query = $('#query') 
	
	document.body.addEventListener('click', (e) => {
		const { target } = e

		if (target.classList.contains('search_btn')) {
			const query = $query.value.trim()
			if (query !== '') {
				search()
			}
		}
		if (target.classList.contains('reading_btn')) {
			const text = target.innerText
			const isDeleted = text === '삭제하기'
			let isConfirm = false
			if (isDeleted) {
				const confirmMessage = confirm('도서를 삭제하시겠습니까?')
				isConfirm = confirmMessage
			} else {
				isConfirm = true
			}

			if (isConfirm) {
				const notyf = new Notyf({
					types: [
						{
							type: 'success',
							background: 'blue',
						},
					],
					dismissible: true,
				})
				const { isbn } = target.dataset
				const savedBooks = getBooks()
				const updatedBooks = savedBooks.map((book) => {
					return book.isbn === isbn ? { ...book, is_listed: !isDeleted } : book
				})
        
				setBooks(updatedBooks)

				if (window.location.pathname === '/readinglist' && isDeleted) {
					target.closest('.card').remove()
				}
				if (isDeleted) {
					target.innerText = `읽기 목록에 담기`
					notyf.success('읽기 목록에서 삭제되었습니다.')
				} else {
					target.innerText = `삭제하기`
					notyf.success('읽기 목록에 담았습니다.')
				}
			}
		}
	})
  
	
	$query.addEventListener('keypress', (e) => {
		const query = $query.value.trim()
		if (e.key === 'Enter' && query !== '') {
			search()
		}
	})
}

export default function App(props) {
	const { pathname } = window.location
	const el = document.getElementById('app')
	return {
		render(component = parseHTML('')) {
			while (el.hasChildNodes()) {
				el.removeChild(el.lastChild)
			}
			el.appendChild(parseHTML(Header()))
			el.appendChild(component)
			setEvent()

			// 대출 상태 조회하기
			if (pathname !== '/' & props !== undefined) {
				const { updatedSearchedList } = props
				// update 날짜가 오늘이 아닌 경우 조회
				const shouldUpdateList = updatedSearchedList.filter((book) => {
					return book.updated !== getToday()
				})

				// 대출 상태를 조회할 책 목록이 있다면
				if (shouldUpdateList.length > 0) {
					getLibraryInfo(shouldUpdateList).then((response) => {
						let savedBooks = getBooks()

						// 저장된 값을 현재 날짜로 업데이트 하기
						const updatedBooks = savedBooks.map((book) => {
							const idx = response.findIndex((b) => b.isbn === book.isbn)

							if (idx !== -1) {
								return { ...response[idx], updated: getToday() }
							} else {
								return book
							}
						})

						setBooks(updatedBooks)

						// update ui
						response.forEach((v, i) => {
							const statusBox = $(`div[data-isbn='${v.isbn}']`)
							if (statusBox !== undefined) {
								while (statusBox.hasChildNodes()) {
									statusBox.removeChild(statusBox.lastChild)
								}
								statusBox.appendChild(parseHTML(StatusBox(response[i])))
							}
              
							const infoButtonWrap = $(`button[data-isbn='${v.isbn}']`).closest('div')
							if (infoButtonWrap !== undefined) {
								while (infoButtonWrap.hasChildNodes()) {
									infoButtonWrap.removeChild(infoButtonWrap.lastChild)
								}
								infoButtonWrap.appendChild(parseHTML(ButtonBox(response[i])))
							}
						})
					})
				}
        
				$('main').appendChild(Paginator(props))
			}
			el.appendChild(parseHTML(Foooter()))
		},
	}
}
