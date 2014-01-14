var request = require('request');
var cheerio = require('cheerio');

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
        res.translations.push({
          word: link.attribs.title.replace(/ – .*/, '').replace(/ \(.*\)$/, '').toLowerCase(),
          lang: link.attribs.lang,
          href: link.attribs.href
        })
      }
    });

    cb(null, res);
  });
}
