/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"sLuZyADXrzJnvQqS","label":"reddit","bookmarks":[{"id":"T3055VfpYLAoJ2UQ","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"Xxhu4W0c7PjDH9tQ","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"Du3yIKrTK8DvNC0b","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"5XJfan2xzaJaM9Qv","label":"design tools","bookmarks":[{"id":"JwNMf96Mb1AA64Xb","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"YWTtJnb3IaGnbtZf","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"cdrZkYQDMroC80dW","label":"haikei","url":"https://app.haikei.app/"},{"id":"mTqthCl0Wxwkdsi9","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"YO1tPCTu9J40LKAM","label":"worth reading","bookmarks":[{"id":"Vrq7hlQ78s8c03Jy","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"To3z0ro1tTw9ZjDE","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"y8wXCN6hvLqMsFpu","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"MfUomtIW9qqLeXjj","label":"sources","bookmarks":[{"id":"OPQyZFUk3kJYP997","label":"icons","url":"https://feathericons.com/"},{"id":"0bFPpxEu5omMYVcl","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"r8HpDEJnOvpNf03O","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"5AcTF7OZzjp1232T","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
