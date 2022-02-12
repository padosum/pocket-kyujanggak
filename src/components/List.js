import Card from './Card'
const tag = `List`

export default function List(books, isReadingList) {
  
	let list = ``
	books.forEach(el => {
		const { title, authors, contents, isbn, thumbnail, hasBook, loanAvailable, updated, is_listed } = el
		list += Card({ 
			title, 
			contents,
			isbn,
			thumbnail,
			authors,
			hasBook,
			loanAvailable,
			updated,
			is_listed
		}, isReadingList) 
	})
  
	return list
}