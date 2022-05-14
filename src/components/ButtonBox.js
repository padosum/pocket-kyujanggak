import DropdownButton from './DropdownButton'

export default function ButtonBox(props) {
  const { isListed, isbn, hasBook, updated } = props

  // 도서 대출 상태를 조회하기 전에는 읽기 목록 담기 버튼 비활성화
  const saveButton = updated
    ? `<button class="btn reading_btn mr-1" data-isbn="${isbn}" type="button" aria-label="읽기 목록에 담기">읽기 목록에 담기</button>`
    : ''

  return `
    ${
      isListed
        ? `<button class="btn reading_btn mr-1" data-isbn="${isbn}" type="button" aria-label="삭제하기">삭제하기</button>`
        : saveButton
    }
    ${hasBook === 'N' ? `${DropdownButton()}` : ''}
    `
}
