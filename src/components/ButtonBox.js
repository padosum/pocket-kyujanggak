import DropdownButton from './DropdownButton'

export default function ButtonBox(props) {
  const { isListed, isbn, hasBook } = props
  return `
    ${
      isListed
        ? `<button class="btn reading_btn mr-1" data-isbn="${isbn}" type="button" aria-label="삭제하기">삭제하기</button>`
        : `<button class="btn reading_btn mr-1" data-isbn="${isbn}" type="button" aria-label="읽기 목록에 담기">읽기 목록에 담기</button>`
    }
    ${hasBook === 'N' ? `${DropdownButton()}` : ''}
    `
}
