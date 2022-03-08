import { Notyf } from 'notyf'

const URLS = {
  BookStatus: '/api/bookExist',
  BookList: 'https://dapi.kakao.com/v3/search/book',
}

const request = async (url, params, option) => {
  const urlSearchParams = new URLSearchParams(params)
  const response = await fetch(`${url}?${urlSearchParams}`, option)
  try {
    if (!response.ok) {
      const notyf = new Notyf({
        dismissible: true,
      })
      notyf.error('에러가 발생했습니다.')
    }
    return response.json()
  } catch (err) {
    return err
  }
}

const BookApi = {
  async getBookStatus(isbn13) {
    const authKey = import.meta.env.VITE_LIBRARY_API_KEY
    const libCode = '121014'
    return request(URLS.BookStatus, {
      authKey,
      libCode,
      isbn13,
      format: 'json',
    })
  },
  async getBookList(params) {
    return request(URLS.BookList, params, {
      headers: {
        Authorization: import.meta.env.VITE_KAKAO_API_KEY,
      },
    })
  },
}

export default BookApi
