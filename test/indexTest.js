var should = require("should")
var fs = require("fs")
var translate = require("..")

describe("wikipedia-translator", function() {

  it("translates known words", function(done) {
    translate("cheese", function(err, translation) {

      // Make sure no errors are present
      should.strictEqual(null, err)

      translation.should.have.property('query', 'cheese');
      translation.should.have.property('translations');
      translation.translations.length.should.be.above(10)

      var first = translation.translations[0]
      first.should.have.property('word', 'Kaas')
      first.should.have.property('lang', 'af')
      first.should.have.property('href')

      done()
    })

  })

  it("handles queries without results", function() {

    translate("cheese-squeeze-knees-please", function(err, translation) {
      translation.should.have.property('query', 'cheese-squeeze-knees-please');
      translation.should.have.property('translations');
      translation.translations.length.should.be(0)
      done();
    })

  })

})