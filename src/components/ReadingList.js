import List from './List'

export default function ReadingList(books) {
	let list = `<h1>읽기 목록</h1>
  <div class="list">
  `
	list += List(books, true)
	list += `</div>`
	return list
} 