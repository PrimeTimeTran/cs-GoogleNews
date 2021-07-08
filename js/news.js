const allowedQueryParams = ["q", "country", "page"];


let url =
  "https://newsapi.org/v2/top-headlines?apiKey=a789c89d7c354c64afc320506517b71f";

function renderSingleArticle(article) {
  return `
    <li class="mb-3 align-self-center article">
      <div class="img-container">
        <h1 class="font-weight-bold">${article.title}</h1>
        <img src="${article.urlToImage}" alt="Snow" />
      </div>
      <hr class="mt-4" />
      <div class="d-flex align-items-center">
        <i class="fa fa-edit"></i>
        <p class="mb-0">${article.author}</p>
      </div>
      <hr />
      <div class="d-flex align-items-center justify-content-between">
        <p class="mb-0"><a href="${article.url}">${article.source.name}</a></p>
        <p class="mb-0"><i class="fa fa-calendar"></i>${moment(
          article.publishedAt,
        ).format("LLL")}</p>
      </div>
      <hr />
      <p class="mt-3"><i class="fa fa-envelope"></i>${article.content}</p>
    </li>
  `;
}

function produceUrl() {
  const queryParams = window.location.search
    .replace("?", "")
    .split("&")
    .map((k) => k.split("="));

  if (!queryParams.includes("language")) {
    queryParams.push(["language", "en"]);
  }

  for (let queryParam of queryParams) {
    if (!allowedQueryParams.some((p) => p.includes(queryParam))) {
      url += `&${queryParam[0]}=${queryParam[1]}`;
    }
  }
  return url;
}

function renderTitle(num) {
  document.getElementById("title").innerHTML = `CoderNews (${num})`;
}

function renderArticles(articles) {
  const articlesHTML = articles.map(renderSingleArticle);

  document.getElementById("newsList").innerHTML = articlesHTML.join("");
} 

async function fetchNewsArticles() {
  let articles;
  try {
    const response = await fetch(produceUrl());
    const json = await response.json();
    articles = json.articles;
    localStorage.setItem("mostRecentNewsArticles", JSON.stringify(articles));
  } catch (error) {
    articles = JSON.parse(localStorage.getItem("mostRecentNewsArticles"));
  } finally {
    console.log({ articles });
    renderTitle(articles.length);
    renderArticles(articles);
  }
}

fetchNewsArticles();
