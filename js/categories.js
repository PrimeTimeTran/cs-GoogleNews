const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

function renderCategoriesList() {
  const anchorTags = []
  for (const category of categories) {
    anchorTags.push(`<a class="category-item" href="http://127.0.0.1:5502/index.html?category=${category}">${category}</a>`)
  }
  document.getElementById("categoriesList").innerHTML = anchorTags.join('')
  
}


renderCategoriesList()