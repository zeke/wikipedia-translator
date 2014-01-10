var request = require('request');
var cheerio = require('cheerio');

var translate = module.exports = function(query, cb) {

  var url = 'http://en.wikipedia.org/wiki/' + query;

  request(url, function(err, resp, body){
    var $ = cheerio.load(body);
    var links = $('#p-lang ul li a[title]');
    var res = {}
    res.query = query
    res.url = url
    res.translations = []

    $(links).each(function(i, link){
      if (link.attribs.lang) {
        res.translations.push({
          word: link.attribs.title.split(' – ')[0],
          language: link.attribs.lang,
          code: link.attribs.title.split(' – ')[1],
          href: link.attribs.href
        })
      }
    });

    cb(null, res);
  });
}
