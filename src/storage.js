const getBooks = () => {
	return JSON.parse(localStorage.getItem('books'))
}

const setBooks = (books) => {
	localStorage.setItem('books', JSON.stringify(books))
}

export { getBooks, setBooks } 