const Header = () => {
	return `
  <header>
    <h1 class="title"><a href="/">포켓 규장각</a></h1>
    <div class="header-contents">
      <div class="search_form">
        <input id="query" placeholder="도서명" aria-label="도서명 검색"/>
        <button class="btn search_btn">검색</button>
      </div>
      <nav>
        <a class="reading_list" href="/readinglist">읽기 목록</a>
      </nav>
    </div>
  </header>
  `
}

export default Header