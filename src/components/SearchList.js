import List from './List'

export default function SearchList(query, books) {
  let list = `<h2 class="title mb-10">'${query}' 검색 결과</h2>`
  list += `<div>`
  list += List(books)
  list += `</div>`
  return list
}
