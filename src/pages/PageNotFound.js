import App from '../app'
import parseHTML from '../helpers/parse-html'

const PageNotFound = () => {
  const app = App()
  app.render(
    parseHTML(`
    <main>
      <h1>404 Page Not Found</h1>
      <p class="information">
        페이지를 찾을 수 없습니다.
      </p>
    </main>
    `)
  )
}

export default PageNotFound
