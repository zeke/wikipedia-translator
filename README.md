# Wikipedia Translator

> A node module that scrapes translations from Wikipedia pages

## Instalation

```
npm install wikipedia-translator --save
```

## Usage

```js
var translate = require('wikipedia-translator');

// Specify a language:
translate('gato', 'es' function(err, translation) {
  console.log(translation);
});

// Or omit the language to default to English:
translate('cheese', function(err, translation) {
  console.log(translation);
});

// Results look like this:
{
  query: 'cheese',
  lang: 'en',
  url: 'http://en.wikipedia.org/wiki/cheese',
  translations: [{
    word: 'kaas',
    lang: 'af',
    href: '//af.wikipedia.org/wiki/Kaas'
  }, {
    word: 'cīese',
    lang: 'ang',
    href: '//ang.wikipedia.org/wiki/C%C4%ABese'
  }, {
    word: 'جبن',
    lang: 'ar',
    href: '//ar.wikipedia.org/wiki/%D8%AC%D8%A8%D9%86'
  }, {
    word: 'queso',
    lang: 'an',
    href: '//an.wikipedia.org/wiki/Queso'
  }, {
    word: 'ܓܒܬܐ',
    lang: 'arc',
    href: '//arc.wikipedia.org/wiki/%DC%93%DC%92%DC%AC%DC%90'
  }, {
    word: 'quesu',
    lang: 'ast',
    href: '//ast.wikipedia.org/wiki/Quesu'
  }]
}
```

- `query` is the word to look up
- `language` is an optional [wikipedia language code](https://github.com/zeke/wikipedias/blob/aca31e60d47a62141def09f6ceed05c98ebf0b57/data.json) string. Defaults to `en`.
- `callback` takes two arguments: an error and the response object.

## Tests

```
npm test

wikipedia-translator
  ✓ translates known words
  ✓ includes the query and query lang in the result object
  ✓ gracefully handles queries that don't yield results
  ✓ defaults to English (en) wikipedia
  ✓ allows wikipedia language code as second param
```

## License

MIT