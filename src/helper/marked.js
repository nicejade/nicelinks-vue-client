import { marked } from 'marked'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text)
  return html.replace(/^<a /, '<a target="_blank" rel="noopener" ')
}

marked.setOptions({
  renderer,
  sanitize: false,
})

export const parse = marked.parse
