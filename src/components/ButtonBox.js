export default function ButtonBox(props) {
  const { is_listed, isbn, hasBook } = props
  return `
    ${
      is_listed
        ? `<button type="button" class="btn reading_btn" data-isbn="${isbn}">삭제하기</button>`
        : `<button type="button" class="btn reading_btn" data-isbn="${isbn}">읽기 목록에 담기</button>`
    }
    ${
      hasBook === 'N'
        ? `<a href="https://library.busan.go.kr/ydbooks/member/book/hopeBook" target="_blank" class="btn">희망도서 신청하기</a>`
        : ''
    }
    `
}
