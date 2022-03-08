import Card from './Card'

export default function List(books, title) {
  let list = `<h2 class="title mb-10">${title}</h2>
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
      is_listed,
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
      is_listed,
    })
  })

  list += `</div>`

  return list
}
