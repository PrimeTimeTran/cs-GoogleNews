const languages = ["en", "jp", "fr", "rs", "cn", "gb"];

function renderLanguageList() {
  const anchorTags = []
  for (const language of languages) {
    anchorTags.push(
      `<a class="ml-1" href="http://127.0.0.1:5502/index.html?language=${language}">${language}</a>,`,
    );
  }
  document.getElementById("languages").innerHTML = anchorTags.join("");
  
}


renderLanguageList()