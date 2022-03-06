import { getToday, cutString } from '../helpers/utils'
import StatusBox from './StatusBox'
import ButtonBox from './ButtonBox'
export default function Card(props) {
  const { authors, thumbnail, title, contents, url, updated, isbn } = props
  const authorsList = Array.isArray(authors)
    ? authors.reduce((prev, curr) => (prev += `, ${curr}`))
    : authors
  const cutDescription = contents.length > 100
  const description = cutDescription ? cutString(contents, 100) : contents
  const imageUrl = thumbnail === '' ? '../assets/no-image.png' : thumbnail
  
  return `<div class="card d-flex mb-10">
      <div class="thumbnail_wrap d-flex justify-center p-8">
        <img src="${imageUrl}"/>
      </div>
      <div class="info_wrap d-flex flex-col flex-grow py-0 px-3">
        <div class="title_wrap d-flex justify-between mt-4">
          <span class="title">
            ${title}
          </span>
          <a href="${url}" rel="noopener" target="_blank">
              <i class="fa fa-solid fa-link ml-1"></i>
          </a>
        </div>
        
        <div class="authors_wrap">
          <span class="authors">${authorsList}</span> 저
        </div>
        <div class="description">
          <p>${description}</p>
        </div>
        ${
          updated === getToday()
            ? StatusBox(props)
            : `<div class="message d-flex" data-isbn="${isbn}"><span class="mt-1"><i class="fa-solid fa-magnifying-glass"></i> 확인중입니다...</span> <span class="lds-dual-ring"></span>
        </div>`
        }
        <div class="info_button_wrap d-flex justify-end py-3">
          ${ButtonBox(props)}
        </div>
      </div>
    </div>`
}
