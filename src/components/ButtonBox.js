import DropdownButton from './DropdownButton'
export default function ButtonBox(props) {
  const { is_listed, isbn, hasBook } = props
  return `
    ${
      is_listed
        ? `<button class="btn reading_btn mr-1" data-isbn="${isbn}" type="button">삭제하기</button>`
        : `<button class="btn reading_btn mr-1" data-isbn="${isbn}" type="button">읽기 목록에 담기</button>`
    }
    ${hasBook === 'N' ? `${DropdownButton()}` : ''}
    `
}
