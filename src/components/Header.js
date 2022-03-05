const Header = () => {
  return `
  <div class="header_img_wrap pt-2">
      <div class="header_img h-100">
      </div>
  </div>
  <header class="sticky d-flex flex-col items-center py-2">
    <a href="/"><h1 class="title mt-1 p-2">포켓 규장각</h1></a>
    <div class="header-contents d-flex justify-center">
      <div class="search_form d-flex items-center mr-2">
        <input class="mr-2 p-1" id="query" type="text" placeholder="도서명" aria-label="도서명 검색"/>
      </div>
      <nav class="d-flex items-center">
        <a class="reading_list p-1" href="/readinglist" title="읽기 목록"><i class="fa-solid fa-bookmark"></i></a>
      </nav>
    </div>
  </header>
  `
}

export default Header
