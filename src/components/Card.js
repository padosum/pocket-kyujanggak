import { getToday, cutString } from '../helpers/utils'
import StatusBox from './StatusBox'
export default function Card(props) {
	const { authors, thumbnail, title, contents, url, updated, isbn, hasBook, is_listed } = props
	const authorsList = Array.isArray(authors) ? authors.reduce((prev, curr) => prev += `, ${curr}`) : authors
	const cutDescription = contents.length > 200
	const description = cutDescription ? cutString(contents, 200) : contents
  
	return (
		`<div class="card">
      <div class="thumbnail_wrap">
        <img src="${thumbnail}"/>
      </div>
      <div class="info_wrap">
        <div class="title_wrap">
          <span class="title">
            ${title}
          </span>
          <a href="${url}" target="_blank">
              <i class="fa fa-solid fa-link" style="margin-left: -10px"></i>
          </a>
        </div>
        
        <div class="authors_wrap">
          <span class="authors">${authorsList}</span> 저
        </div>
        <div class="description">
          <p>${description}</p>
        </div>
        ${
		updated === getToday() ? StatusBox(props)
			: `<div class="message" data-isbn="${isbn}"><span><i class="fa-solid fa-magnifying-glass"></i> 확인중입니다...</span> <span class="lds-dual-ring"></span>
        </div>`}
        <div class="info_button_wrap">
        ${is_listed ?
			`<button class="btn reading_btn" 
               data-isbn="${isbn}">
        삭제하기
      </button>` :
			`<button class="btn reading_btn"
               data-isbn="${isbn}">
        읽기 목록에 담기
      </button>`}
          ${hasBook === 'N' ? `<a class="btn" href="https://library.busan.go.kr/ydbooks/member/book/hopeBook" target="_blank">희망도서 신청하기</a>` : ''}
      </div>
      </div>
    </div>`
	)
} 
