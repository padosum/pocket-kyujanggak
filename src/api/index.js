import { Notyf } from 'notyf'

const URLS = {
  BookStatus: '/api/bookExist',
  BookList: 'https://dapi.kakao.com/v3/search/book',
}

const request = async (url, params, option) => {
  const notyf = new Notyf({
    dismissible: true,
  })
  try {
    const urlSearchParams = new URLSearchParams(params)
    const response = await fetch(`${url}?${urlSearchParams}`, option)

    if (!response.ok) {
      notyf.error('오류가 발생했습니다.')
      console.error(response.status, response.statusText)
    }

    return response.json()
  } catch (err) {
    notyf.error('오류가 발생했습니다.')
    console.error(err)
    return false
  }
}

const BookApi = {
  getBookStatus(isbn13) {
    const authKey = import.meta.env.VITE_LIBRARY_API_KEY
    const libCode = '121014'
    return request(URLS.BookStatus, {
      authKey,
      libCode,
      isbn13,
      format: 'json',
    })
  },
  getBookList(params) {
    return request(URLS.BookList, params, {
      headers: {
        Authorization: import.meta.env.VITE_KAKAO_API_KEY,
      },
    })
  },
}

export default BookApi
