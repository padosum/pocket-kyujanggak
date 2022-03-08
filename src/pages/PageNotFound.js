const PageNotFound = {
  render: async () => {
    return `
    <h2 class="title mb-5">404 Page Not Found</h2>
      <p class="information p-3">
        페이지를 찾을 수 없습니다.
      </p>
    `
  },
  before_render: async () => {},
  after_render: async () => {},
}

export default PageNotFound
