import { getToday } from '../helpers/utils'
import MetadataBox from './MetadataBox'
export default function Card(props, isReadingList) {
	const { authors, thumbnail, title, contents, updated, isbn, hasBook, is_listed } = props
	console.log(hasBook)
	const authorsList = Array.isArray(authors) ? authors.reduce((prev, curr) => prev += `, ${curr}`) : authors
	return (
		`<div class="card">
      <div class="thumbnail_wrap">
        <img src="${thumbnail}"/>
      </div>
      <div class="info_wrap">
        <h3>${title}</h3>
        <p>${authorsList}</p>
        <p class="description">
          ${contents}
        </p>
        ${
		updated === getToday()
			? MetadataBox(props)
			: `<div class="info_metadata_wrap" data-isbn="${isbn}">
          <span>확인중입니다...</span> <span class="lds-dual-ring"></span>
        </div>`
		}
        <div class="info_button_wrap">
        ${is_listed ?
			`<button class="reading_btn" 
               data-isbn="${isbn}">
        삭제하기
      </button>` :
			`<button class="reading_btn"
               data-isbn="${isbn}">
        읽기 목록에 담기
      </button>`}
          ${hasBook === 'N' ? `<a href="https://library.busan.go.kr/ydbooks/member/book/hopeBook">희망도서 신청하기</a>` : ''}
        </div>
      </div>
      
    </div>`
	)
} 
