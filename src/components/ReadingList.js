import List from './List'

export default function ReadingList(books) {
	let list = `<h2>읽기 목록</h2>
  <div class="list">
  `
	list += List(books, true)
	list += `</div>`
	return list
} 