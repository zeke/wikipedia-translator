# Wikipedia Translator

> A node module that scrapes translations from Wikipedia pages

## Instalation

```
npm install wikipedia-translator --save
```

## Usage

```js
var translate = require('wikipedia-translator');
translate('cheese', function(err, translation) {
  console.log(translation);
});
```

## License

MIT