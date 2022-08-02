const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { setRefreshToken, 
      createUser, createProject, 
      deleteUser, deleteProject} = require('./utils/setDB')

//API PROJECTS ROUTE

beforeAll(async () => {
  await createUser('testAccount', 'test@test.com', 'test12345')
  return createUser('testAccount2', 'test2@test.com', 'test12345')
})
afterAll(() => {
  deleteProject('testProject')
  deleteUser('testAccount2')
  return  deleteUser('testAccount')
})


describe('API POST /projects', () => { 
  test('should return 201', async () => {
    const response = await request.post('/projects')
      .set('Accept', 'application/json')
      .send(({
          username: 'testAccount',
          name: 'testProject',
          status: 'Open',
          members: [ {role : 'Manager', usernames : ['testAccount']}],
          issues : []
      }))
      expect(response.statusCode).toBe(201)
    })
    test('missing field should return 400', async () => {
      const response = await request.post('/projects')
        .set('Accept', 'application/json')
        .send(({
            name: 'testProject',
            status: 'Open',
        }))
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('missing one or more required field')
      }) 
    test('no user found should return 400', async () => {
      const response = await request.post('/projects')
        .set('Accept', 'application/json')
        .send(({
            username: 'wrongTestAccount',
            name: 'testProject',
            status: 'Open',
            members: [ {role : 'Manager', usernames : ['wrongTestAccount']}],
            issues : []
        }))
        expect(response.statusCode).toBe(400)
      }) 
})

describe('API GET /projects', () => {
  beforeAll(() => createProject('testAccount','testProject2', 'Open',  [{role : 'Manager', usernames : ['testAccount']}]))
  afterAll(() => deleteProject('testProject2'))
  
  test('should return 200', async () => {
    const response = await request.get('/projects')
      .set('Accept', 'application/json')
      .send(({
          username: 'testAccount'
      }))
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
    })
    test('Missing username should return 400', async () => {
      const response = await request.get('/projects')
        .set('Accept', 'application/json')
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('Missing username required field')
      })
    test('No projects should return 204 and empty array', async () => {
      const response = await request.get('/projects')
        .set('Accept', 'application/json')
        .send(({
          username: 'testAccount2'
        }))
        expect(response.statusCode).toBe(204)
        expect(response.body).toBeDefined()
      })
})
