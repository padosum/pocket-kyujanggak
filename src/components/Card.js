import { getToday, cutString } from '../helpers/utils'
import StatusBox from './StatusBox'
import ButtonBox from './ButtonBox'

export default function Card(props) {
  const { authors, thumbnail, title, contents, url, updated, isbn, idx } = props
  const authorsList = Array.isArray(authors) ? authors.join(', ') : authors
  const cutDescription = contents.length > 100
  const description = cutDescription ? cutString(contents, 100) : contents
  const imageUrl = thumbnail || '../assets/no-image.png'
  const lazyload = idx > 2
  const imageClass = lazyload ? ` lazy` : ''
  const imageSrc = lazyload ? `` : ` src=${imageUrl}`
  const imagAlt = thumbnail ? `도서 '${title}'의 표지` : `도서 표지 이미지 없음`

  return `<div class="card d-flex mb-10 primary-shadow">
      <div class="d-flex justify-center p-8">
        <img class="book-img primary-shadow${imageClass}"${imageSrc} data-src="${imageUrl}" width="120px" height="160px" data-alt="${imagAlt} "/>
      </div> 
      <div class="info_wrap d-flex flex-col flex-grow py-0 px-3">
        <div class="title_wrap d-flex justify-between mt-4">
          <span class="title">${title}</span>
          <a href="${url}" rel="noopener" target="_blank">
              <i class="fa fa-solid fa-link ml-1"></i>
          </a>
        </div>
        
        <div class="authors_wrap mt-1">
          <span class="authors">${authorsList}</span> 저
        </div>
        <div class="description">
          <p>${description}</p>
        </div>
        ${
          updated === getToday()
            ? StatusBox(props)
            : `<div class="message d-flex items-center" data-isbn="${isbn}">
                <span class="mt-1"><i class="fa-solid fa-magnifying-glass"></i> 확인 중입니다...</span>
                <span class="lds-dual-ring"></span>
               </div>
              `
        }
        <div class="info_button_wrap d-flex justify-end py-3" data-isbn="${isbn}">
          ${ButtonBox(props)}
        </div>
      </div>
    </div>`
}
