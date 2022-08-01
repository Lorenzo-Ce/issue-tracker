const app = require('../app');
const request = require('supertest')(app);
const jwt = require('jsonwebtoken')
const { setRefreshToken, cleanDatabaseRecord } = require('./utils/setDB')
var FakeTimers = require("@sinonjs/fake-timers");
var clock = FakeTimers.createClock();
//REGISTER ROUTE

describe('API /register', () => {
  beforeAll(() => cleanDatabaseRecord('test'))

  test('POST ok data should return 201', async () => {
    const response = await request.post('/register')
      .set('Accept', 'application/json')
      .send(({
        username : 'test',
        password: 'test1234',
        email : 'test@example.com'
      }))
      expect(response.statusCode).toBe(201)
      expect(response.body.username).toBe('test')
    })

  describe('API /register duplicate mail', () => {
    test('POST duplicate email should return 409', async () =>{
      const response = await request.post('/register')
      .set('Accept', 'application/json')
      .send(({
        username : 'test11',
        password: 'test1234',
        email : 'test@example.com'
      }))
      expect(response.statusCode).toBe(409)
      expect(response.body).toHaveProperty('error', 'Email already present in DB')
    })
  })
})

//LOGIN ROUTE

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
  test('POST wrong username should return 400', async () => {
    const response = await request.post('/login')
    .set('Accept', 'application/json')
    .send({
      email : 'tst@example.com',
      password : 'test1234'
    })
    expect(response.statusCode).toBe(400)
  })
  test('POST wrong password should return 403', async () => {
    const response = await request.post('/login')
    .set('Accept', 'application/json')
    .send({
      email : 'test@example.com',
      password : 'wrongtestpsw'
    })
    expect(response.statusCode).toBe(403)
  })
})

//REFRESH ROUTE

describe('API /refresh route', () =>{
  const email = 'test@example.com'
  const refreshToken = jwt.sign({
    email
    },
    process.env.SECRET_REFRESH_TOKEN,
    {expiresIn: '30m'}
  )
  const wrongRefreshToken = jwt.sign({
    email: 'tst@example.com'
    },
    process.env.SECRET_REFRESH_TOKEN,
    {expiresIn: '30m'}
  )
  beforeAll(() => setRefreshToken(email, refreshToken));

  test('POST valid token should return 200', async () => {
    const response = await request.post('/refresh').set('Cookie', `token=${refreshToken}`)
    expect(response.statusCode).toBe(200)
  })  
  test('POST missing Token should return 400', async () => {
    const response = await request.post('/refresh').set('Cookie', ``)
    expect(response.statusCode).toBe(400)
  })  
  test('POST wrong email should return 403', async () => {
    const response = await request.post('/refresh').set('Cookie', `token=${wrongRefreshToken}`)
    expect(response.statusCode).toBe(403)
  })  
})
