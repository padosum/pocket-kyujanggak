import 'skeleton-screen-css'

export default function Skeleton(count) {
  const template = () => {
    return `
    <div class="ssc ssc-card card d-flex mb-10">
      <div class="thumbnail_wrap d-flex justify-center p-8">
        <div class="ssc-square book-img"></div>
      </div>
      <div class="w-100 d-flex flex-col flex-grow py-0 px-3 mb-10">
          <div class="d-flex mt-4">
              <div class="ssc-head-line mb w-50"></div>
          </div>
          <div class="ssc-line w-20"></div>
          <br>
          <div class="ssc-line w-90"></div>
          <div class="ssc-line w-90"></div>
          <div class="ssc-line w-20 mt-1"></div>
      </div>
    </div>
  `
  }

  return `
  <div class="title mb-5">💻 조회 중입니다.</div>
  ${template().repeat(count)}
  `
}
