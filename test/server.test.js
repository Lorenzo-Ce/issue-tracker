const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { setRefreshToken, deleteUser } = require('./utils/setDB')

//REGISTER ROUTE

afterAll(() => deleteUser('test'))

describe('API /register', () => {
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

  describe('POST duplicate email', () => {
    test('Should return 409', async () =>{
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

describe('API /refresh', () =>{
  
  beforeAll(() => setRefreshToken('test@example.com', refreshToken))

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

//LOGOUT ROUTE

describe('API /logout', () => {

  beforeAll(() => setRefreshToken('test@example.com', refreshToken))

  test('POST should return 204', async () => {
    const response = await request.post('/logout').set('Cookie', `token=${refreshToken}`)
    expect(response.statusCode).toBe(204)
    expect(response.cookies).toBe(undefined)
  })
  test('POST no refresh Token should return 205', async () => {
    const response = await request.post('/logout').set('Cookie', ``)
    expect(response.statusCode).toBe(205)
  })
})

