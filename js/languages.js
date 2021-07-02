const languages = [
  "de",
  "es",
  "he",
  "it",
  "nl",
  "no",
  "pt",
  "ru",
  "se",
  "ud",
  "zh",
  "ar",
  "en",
  "jp",
  "fr",
  "rs",
  "cn",
  "gb",
  "kr",
];

function renderLanguageList() {
  const anchorTags = []
  for (const language of languages) {
    anchorTags.push(
      `<a class="ml-1" href="http://127.0.0.1:5502/index.html?language=${language}">${language}</a>`,
    );
  }
  document.getElementById("languages").innerHTML = anchorTags.join(", ");
  
}


renderLanguageList()