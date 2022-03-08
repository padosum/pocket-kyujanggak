export default function DropdownButton() {
  return `
      <label class="dropdown d-inline-block relative">
        <button class="btn dd-btn">희망도서 신청하기</button>
        <ul class="dd-menu">
          <li><a href="https://library.busan.go.kr:8585/baro/homepage/main.do" rel="noopener" target="_blank">지역서점 바로대출</a></li>
          <li><a href="https://library.busan.go.kr/ydbooks/member/book/hopeBook" rel="noopener" target="_blank">영도도서관</a></li>
        </ul>
      </label>
    `
}
