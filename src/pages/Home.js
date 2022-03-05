import App from '../app'
import parseHTML from '../helpers/parse-html'

const Home = () => {
  const app = App()
  app.render(
    parseHTML(`
    <main>
      <p class="information p-3">
        도서명을 검색하면 영도 도서관의 도서 소장 정보와 대출 상태를 확인할 수 있습니다.<br>
        대출 가능 여부는 조회일 기준 전날 대출 상태를 기준으로 합니다.
      </p>
    </main>`)
  )
}

export default Home
