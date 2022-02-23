const store = {
	setLocalStorage(books) {
		localStorage.setItem('books', JSON.stringify(books))
	},
	getLocalStorage() {
		return JSON.parse(localStorage.getItem('books'))
	}
}

export default store