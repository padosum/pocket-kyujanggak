import List from './List'

export default function SearchList(query, books) {
	let list = `<h2>'${query}' 검색 결과</h2>`
  list += `<div class="list">`
	list += List(books)
	list += `</div>`
	return list
} 