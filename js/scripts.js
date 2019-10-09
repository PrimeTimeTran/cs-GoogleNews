const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=156ba5f24ba940f7bf1b70d3c70a6b6b'

async function getNews() {
  const response = await fetch(url)
  const jsonData = await response.json()
  const { articles } = jsonData
  document.getElementById('title').innerHTML = `Google News (${articles.length})`
  const articlesHTML = articles.map(renderSingleArticle)
  document.getElementById('newsList').innerHTML = articlesHTML.join('')
}

function renderSingleArticle(article) {
  return `
      <li class="article">
        <div class="img-container">
          <img src="${article.urlToImage}" alt="Snow"></img>
          <div class="bottom-left"><h1>${article.title}</h1></div>
        </div>
        <h3><i class="fa fa-edit"></i>${article.author}</h3>
        <h6><a href="${article.url}">${article.source.name}</a></h6>
        <p><i class="fa fa-calendar"></i>${moment(article.publishedAt).format('LLL')}</p>
        <p><i class="fa fa-envelope"></i>${article.content}</p>
      </li>
    `
}

getNews()
