import axios from 'axios'

const search = async (query, page) => { 
	try {
		const listItems = await axios({
			method: 'get',  
			url: 'https://dapi.kakao.com/v3/search/book?target=title',
			headers: {
				Authorization: import.meta.env.VITE_KAKAO_API_KEY,
			}, 
			params: {
				query,
				page,
			},
		})
		return listItems
	} catch (err) {
		console.log(err)
	}
}

export default search