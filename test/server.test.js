const app = require('../app')
var supertest = require("supertest")(app);

describe("API test root", function(){
  it("GET '/' should return 200", function(done) {
    supertest
      .get("/")
      .expect(200)
      .end(done)

    })
})

describe("API /register", function(){
  it("POST '/register' should return 201", function(done) {
    supertest
      .post("/register")
      .expect(201) 
      .end(done)
    })
})