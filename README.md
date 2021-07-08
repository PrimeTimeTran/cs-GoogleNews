# Codernews


## Topics

3.3

- Functions
- REST
- Postman
- Query Parameters
- Fetch then
- Async Await
- Try Catch Finally
- Render
- LocalStorage.getItem()
- LocalStorage.setItem()
- JSON.stringfy()
- JSON.parse()
- window.localStorage
- window.navigator.languages

1. Fetch Data.
2. Consume data in our app.
3. Produce HTML using data.
4. Inject HTML into our U.I.



## Requirements

- [] User sees list of news articles on home page.
- [] User sees card for each news article.
- [] User sees card for each news article in users local language.
- [] User sees card for each news article in users "set" language.
- [] User sees card for each news article in users "set" language.
- [] User sees card's news articles "time" in users "set" language.
- [] User sees weather info on the homepage.
- [] User can "save" favorite news articles".


## Food for thought

By the end of the project you should understand why an object such as this might be useful.

```js
const appState = {
  systemLocale: 'en',
  browserLocale: 'en',
  localArticles: [],
  localFavorites: [],
  fetchedArticles: [],
  currentUser: {
    name: 'Spam',
    favorites: [],
  },
  users: [
    {
      name: 'Ham',
      favoriteArticleIds: [],
    }
  ],
};
```