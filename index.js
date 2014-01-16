var request = require('request');
var cheerio = require('cheerio');
var Levenshtein = require('levenshtein');

var translate = module.exports = function(query, lang, cb) {

  // lang argument is not required and defaults to 'en'
  if (arguments.length === 2) {
    cb = lang
    lang = 'en'
  }

  var url = 'http://' + lang + '.wikipedia.org/wiki/' + query;

  request(url, function(err, resp, body){
    var $ = cheerio.load(body);
    var links = $('#p-lang ul li a[title]');
    var res = {}
    res.query = query
    res.lang = lang
    res.url = url
    res.translations = []

    $(links).each(function(i, link){
      if (link.attribs.lang) {

        var t = {
          word: link.attribs.title
            .replace(/ – .*$/, '')    // one kind of hyphen
            .replace(/ — .*$/, '')    // another kind of hyphen
            .replace(/ \(.*\)$/, '')  // trailing parentheticals
            .toLowerCase(),
          lang: link.attribs.lang,
          href: link.attribs.href
        }

        // Calculate levenshtein distance between query and this result
        t.levenshteinDistance = new Levenshtein(query, t.word).distance

        res.translations.push(t)
      }
    });

    res.translations.sort(function (a, b) {
      a = a.levenshteinDistance
      b = b.levenshteinDistance
      if (a > b)
        return 1
      if (a < b)
        return -1
      return 0
    });

    cb(null, res);
  });
}
