import Card from './Card'

export default function List(books) {
  
	let list = ``
	books.forEach(el => {
		const { title, authors, contents, isbn, thumbnail, url, hasBook, loanAvailable, updated, is_listed } = el
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
			is_listed
		}) 
	})
  
	return list
}