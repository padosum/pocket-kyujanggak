const parseHTML = (html) => {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content
}

export default parseHTML
