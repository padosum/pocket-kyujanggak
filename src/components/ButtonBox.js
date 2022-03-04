export default function ButtonBox(props) {
  const { is_listed, isbn, hasBook } = props
  return `
    ${
      is_listed
        ? `<button class="btn reading_btn" data-isbn="${isbn}" type="button">삭제하기</button>`
        : `<button class="btn reading_btn" data-isbn="${isbn}" type="button">읽기 목록에 담기</button>`
    }
    ${
      hasBook === 'N'
        ? `<a class="btn" href="https://library.busan.go.kr/ydbooks/member/book/hopeBook" rel="noopener" target="_blank">희망도서 신청하기</a>`
        : ''
    }
    `
}
