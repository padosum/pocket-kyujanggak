import Card from './Card'

export default function List(books, listTitle) {
  let list = `<h2 class="title mb-5">${listTitle}</h2>
      <div class="list">`

  books.forEach((el) => {
    const {
      title,
      authors,
      contents,
      isbn,
      thumbnail,
      url,
      hasBook,
      loanAvailable,
      updated,
      isListed,
    } = el
    list += Card({
      title,
      contents,
      isbn,
      thumbnail,
      url,
      authors,
      hasBook,
      loanAvailable,
      updated,
      isListed,
    })
  })

  list += `</div>`

  return list
}
