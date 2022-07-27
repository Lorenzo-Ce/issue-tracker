const { it } = require('date-fns/locale')
const request = require('supertest')
const app = require('../app')

describe("Testing root path", () => {
    test("it should respond with the get method", done => {
        request(app)
            .get('/')
            .then(response => {
                expect(response.statusCode(200))
            })
        done()
    })
})