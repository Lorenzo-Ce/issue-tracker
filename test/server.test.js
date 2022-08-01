const app = require('../app')
const request = require('supertest')(app);

describe('API test root', () => {
  test('GET / should return 200', async () => {
    const response = await request.get('/')
      expect(response.statusCode).toBe(200)
    })
})

describe.skip('API /register', () => {
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

describe('API /login', () =>{
  test('POST /login should return 200', async () => {
    const response = await request.post('/login')
    .set('Accept', 'application/json')
    .send({
      email : 'test@example.com',
      password : 'test1234'
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Successfull Login')
  })
  test('POST /login should return 400', async () => {
    const response = await request.post('/login')
    .set('Accept', 'application/json')
    .send({
      email : 'tst@example.com',
      password : 'test1234'
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('You have entered an invalid email or password')
  })
  test('POST /login should return 400', async () => {
    const response = await request.post('/login')
    .set('Accept', 'application/json')
    .send({
      email : 'test@example.com',
      password : 'wrongtestpsw'
    })
    expect(response.statusCode).toBe(403)
    expect(response.body.error).toBe('You have entered an invalid email or password')
  })
})

describe('API /refresh route', () =>{
  test('POST /login should return 400', async () => {
    const response = await request.post('/login')
    .auth(process.env.TOKEN_TRY , { type: 'bearer' });
    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBe('You have entered an invalid email or password')
  })  
})
