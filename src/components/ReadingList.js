import List from './List'

export default function ReadingList(books) {
  let list = ''
  if (books.length > 0) {
    list = `<h2 class="title mb-10">읽기 목록</h2>`
    list += `<div>`
    list += List(books)
    list += `</div>`
  } else {
    list = `<div>읽기 목록에 도서가 없습니다.</div>`
  }

  return list
}
