import List from './List'
const tag = '[SearchList]'
export default function SearchList(books) {
	console.log(`books`, books)
	let list = `<h2>검색 결과</h2>
  <div class="list">
  `
	list += List(books, false)
	list += `</div>`
	return list
} 