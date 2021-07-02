const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe";

async function getNews() {
  const response = await fetch(url);
  const json = await response.json();
  const { articles } = json;
  document.getElementById("title").innerHTML = `CoderNews (${articles.length})`;
  const articlesHTML = articles.map(renderSingleArticle);
  document.getElementById("newsList").innerHTML = articlesHTML.join("");
}

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
          article.publishedAt
        ).format("LLL")}</p>
      </div>
      <hr />
      <p class="mt-3"><i class="fa fa-envelope"></i>${article.content}</p>
    </li>
  `;
}

getNews();

const addScript = (language) => {
  var s = document.createElement("script");
  s.setAttribute(
    "src",
    `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}.js`
  );
  document.body.appendChild(s);
};

if (window.clientInformation.language == "ko-KR") {
  addScript("ko");
} else if (window.clientInformation.language == "vi") {
  addScript("vi");
}

function stripHtml(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
