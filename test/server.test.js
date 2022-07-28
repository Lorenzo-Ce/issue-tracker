const app = require('../app')
const request = require('supertest')(app);

describe('API test root', () => {
  test('GET / should return 200', async () => {
    const response = await request.get('/')
      expect(response.statusCode).toBe(200)
    })
})

describe('API /register', () => {
  test('POST /register should return 201', async () => {
    const response = await request.post('/register')
      .set('Accept', 'application/json')
      .send(({
        username : 'test',
        password: 'test1234',
        email : 'test@example.com'
      }))
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
      expect(response.statusCode).toBe(201)
      expect(response.body.username).toBe('test')
    })

  describe('API /register duplicate mail', () => {
    test('POST /register should return 409', async () =>{
      const response = await request.post('/register')
      .set('Accept', 'application/json')
      .send(({
        username : 'test11',
        password: 'test1234',
        email : 'test@example.com'
      }))
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
      expect(response.statusCode).toBe(409)
      expect(response.body).toHaveProperty('Error', 'Email already present in DB')
    })
  })
})