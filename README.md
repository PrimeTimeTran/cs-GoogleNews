# Crypto News

## Requirements

- [] User sees list of news articles on home page.
- [] User sees card for each news article.
- [] User sees card for each news article in users local language.
- [] User sees card for each news article in users "set" language.
- [] User sees card for each news article in users "set" language.
- [] User sees card's news articles "time" in users "set" language.
- [] User sees weather info on the homepage.
- [] User can "save" favorite news articles".

```js
const appState = {
  systemLocale: 'en',
  browserLocale: 'en',
  currentUser: {
    userFavorties: [],
  },
  users: [],
  newsArticles: [],
  cryptoprices: [],
  weather: {
  }
};
```