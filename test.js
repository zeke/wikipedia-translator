const should = require('should')
const translate = require('.')

describe('wikipedia-translator', function () {
  it('translates known words', function (done) {
    translate('cheese', function (err, translation) {
      // Make sure no errors are present
      should.strictEqual(null, err)

      translation.should.have.property('query', 'cheese')
      translation.should.have.property('translations')
      translation.translations.length.should.be.above(10)

      const first = translation.translations[0]
      first.should.have.property('word')
      first.should.have.property('lang')
      first.should.have.property('href')

      done()
    })
  })

  it('includes the query and query lang in the result object', function (done) {
    translate('lavender', function (err, translation) {
      if (err) console.log(err)
      translation.should.have.property('query', 'lavender')
      translation.should.have.property('lang', 'en')
      done()
    })
  })

  it("gracefully handles queries that don't yield results", function (done) {
    translate('cheese-squeeze-knees-please', function (err, translation) {
      if (err) console.log(err)
      translation.should.have.property('translations')
      should.equal(translation.translations.length, 0)
      done()
    })
  })

  it('defaults to English (en) wikipedia', function (done) {
    translate('finger', function (err, translation) {
      if (err) console.log(err)
      translation.should.have.property('translations')
      translation.should.have.property('lang', 'en')
      translation.translations.forEach(function (t) {
        if (t.word.match(/dedo/i)) done()
      })
    })
  })

  it('allows wikipedia language code as second param', function (done) {
    translate('caballo', 'es', function (err, translation) {
      if (err) console.log(err)
      translation.should.have.property('lang', 'es')
      translation.translations.map(function (t) { return t.word }).should.include('horse')
      done()
    })
  })

  it('cleans up funky french hyphens', function (done) {
    translate('pomme', 'fr', function (err, translation) {
      if (err) console.log(err)
      translation.should.have.property('lang', 'fr')
      translation.translations.map(function (t) { return t.word }).should.include('apple')
      done()
    })
  })

  it('sorts results by levenshtein distance', function (done) {
    translate('bread', 'en', function (err, translation) {
      if (err) console.log(err)
      const words = translation.translations.map(function (t) { return t.word })
      words.indexOf('breid').should.be.above(0)
      words.indexOf('breid').should.be.below(20)
      
      words.indexOf('brood').should.be.above(0)
      words.indexOf('brood').should.be.below(20)
      // words.indexOf('breyð').should.be.below(20)
      // words.indexOf('brauð').should.be.below(20)

      words.indexOf('umugati').should.be.above(50)
      done()
    })
  })

  it('handles character encoding', function (done) {
    translate('jadinnge - 科隆语', 'ksh', function (err, translation) {
      if (err) console.log(err)
      translation.should.have.property('query', 'jadinnge - 科隆语')
      translation.should.have.property('translations')
      done()
    })
  })
})
