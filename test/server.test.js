const app = require('../app')
var supertest = require("supertest")(app);

describe("API TEST root route", function(){
  it("GET '/' should return 200", function(done) {
    supertest
      .get("/")
      .expect(200)
      .end(done)

    })
})