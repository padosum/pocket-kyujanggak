
const Home = {
  render: async () => {
    let view = `
      <p class="information primary-shadow p-3">
        도서명을 검색하면 영도 도서관의 도서 소장 정보와 대출 상태를 확인할 수 있습니다.<br>
        대출 가능 여부는 조회일 기준 전날 대출 상태를 기준으로 합니다.
      </p>
    `

    return view
  },
  before_render: async () => {},
  after_render: async () => {},
}

export default Home
