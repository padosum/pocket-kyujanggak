import App from '../app'
import parseHTML from '../helpers/parse-html'

const PageNotFound = () => {
  const app = App()
  app.render(
    parseHTML(`
    <main>
      <h2 class="title mb-5">404 Page Not Found</h2>
      <p class="information p-3">
        페이지를 찾을 수 없습니다.
      </p>
    </main>
    `)
  )
}

export default PageNotFound
