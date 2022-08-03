const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { setRefreshToken, 
      createUser, createProject, 
      deleteUser, deleteProject} = require('./utils/setDB')

 

//API PROJECTS ROUTE
let id 
beforeAll(async () => {
  await createUser('testAccount', 'test@test.com', 'test12345')
  await createUser('testAccount2', 'test2@test.com', 'test12345')
  id = await createProject('testAccount','testProject2', 'Open',  [{role : 'Manager', usernames : ['testAccount']}])
})
afterAll(() => {
  deleteProject('testProject')
 // deleteProject('testProject2')
  deleteUser('testAccount2')
  deleteUser('testAccount')
})


describe('API POST /projects', () => { 
  test('should return 201', async () => {
    const response = await request.post('/projects')
      .set('Accept', 'application/json')
      .send(({
          username: 'testAccount',
          name: 'testProject',
          status: 'Open',
          members: [{role : 'Manager', usernames : ['testAccount']}]
      }))
      expect(response.statusCode).toBe(201)
      expect(response.body).toBeDefined()
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

describe('API GET /projects/:id', () => {
  test("should return 200" , async () => {
    const response = await request.get(`/projects/${id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
  })
  test("Project not found should return 404" , async () => {
    const response = await request.get('/projects/62e9211b39d5fd8065846452')
    expect(response.statusCode).toBe(404)
    expect(response.body).toBeDefined()
  })
  describe('API DELETE /projects/:id', () => {
    test('should return 200', async () => {
      const response = await request.delete(`/projects/${id}`)
      expect(response.statusCode).toBe(200)
    })
    test('should return 204', async () => {
      const response = await request.delete(`/projects/62e9211b39d5fd8065846452`)
      expect(response.statusCode).toBe(204)
    })
  })
})