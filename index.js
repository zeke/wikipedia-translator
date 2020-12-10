const request = require('request')
const cheerio = require('cheerio')
const Levenshtein = require('levenshtein')

const translate = function (query, lang, cb) {
  // lang argument is not required and defaults to 'en'
  if (arguments.length === 2) {
    cb = lang
    lang = 'en'
  }

  const url = 'http://' + lang + '.wikipedia.org/wiki/' + query

  request(url, function (err, resp, body) {
    if (err) return cb(err)

    const $ = cheerio.load(body)
    const links = $('#p-lang ul li a[title]')
    const res = {}
    res.query = query
    res.lang = lang
    res.url = url
    res.translations = []

    $(links).each(function (i, link) {
      if (link.attribs.lang) {
        const t = {
          word: link.attribs.title
            .replace(/ – .*$/, '') // one kind of hyphen
            .replace(/ — .*$/, '') // another kind of hyphen
            .replace(/ \(.*\)$/, '') // trailing parentheticals
            .toLowerCase(),
          lang: link.attribs.lang,
          href: link.attribs.href
        }

        // Calculate levenshtein distance between query and this result
        t.levenshteinDistance = new Levenshtein(query, t.word).distance

        res.translations.push(t)
      }
    })

    res.translations.sort(function (a, b) {
      a = a.levenshteinDistance
      b = b.levenshteinDistance
      if (a > b) { return 1 }
      if (a < b) { return -1 }
      return 0
    })

    cb(null, res)
  })
}

module.exports = translate
