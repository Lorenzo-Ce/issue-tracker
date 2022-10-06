const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { setRefreshToken, setAccessToken,
      createUser, createProject, deleteUser, deleteProject} = require('./utils/setDB')


//API PROJECTS ROUTE
let id, id2
let accessToken, accessToken2
beforeAll(async () => {
  await createUser('testAccount', 'test@test.com', 'test12345')
  await createUser('testAccount2', 'test2@test.com', 'test12345')
  accessToken = await setAccessToken('testAccount') 
  accessToken2 = await setAccessToken('testAccount2') 
  id = await createProject('testAccount','testProject2', 'Open', {'Lead': ['testAccount']})
  id2 = await createProject('testAccount','testProject3', 'Open', {'Lead': ['testAccount']})
})

afterAll(() => {
  deleteProject('testProject')
  deleteProject('testProject2')
  deleteProject('testProject3')
  deleteProject('NewProjectName')
  deleteUser('testAccount2')
  deleteUser('testAccount')
})

describe('API POST /projects', () => { 
  test('should return 201', async () => {
    const response = await request.post('/projects').set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application/json')
      .send(({
          username: 'testAccount',
          name: 'testProject',
          status: 'Open',
          roles:{'Lead': ['testAccount'], 'Member' : ['Paul', 'Tony' ]}
      }))
      expect(response.statusCode).toBe(201)
      expect(response.body).toBeDefined()
    })
    test('missing field should return 400', async () => {
      const response = await request.post('/projects').set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json')
        .send(({
            name: 'testProject',
            status: 'Open',
        }))
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('missing one or more required field')
      }) 
    test('no user found should return 400', async () => {
      const response = await request.post('/projects').set('Authorization', `Bearer ${accessToken}`)
        .set('Accept', 'application/json')
        .send(({
            username: 'wrongTestAccount',
            name: 'testProject',
            status: 'Open',
            roles: {'Lead': ['testAccount']},
            issues : []
        }))
        expect(response.statusCode).toBe(400)
      }) 
})

describe('API GET all /projects', () => {
  test('should return 200', async () => {
    const response = await request.get('/projects').set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application/json')
      .send(({
          username: 'testAccount'
      }))
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeDefined()
    })
    test('No projects should return 204 and empty array', async () => {
      const response = await request.get('/projects').set('Authorization', `Bearer ${accessToken2}`)
        .set('Accept', 'application/json')
        .send(({
          username: 'testAccount2'
        }))
        expect(response.body).toBeDefined()
        expect(response.statusCode).toBe(204)

      })
})

describe('API GET /projects/:id', () => {
  test("should return 200" , async () => {
    const response = await request.get(`/projects/${id}`).set('Authorization', `Bearer ${accessToken}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
  })
  test("Project not found should return 404" , async () => {
    const response = await request.get('/projects/62e9211b39d5fd8065846452').set('Authorization', `Bearer ${accessToken}`)
    expect(response.statusCode).toBe(404)
    expect(response.body).toBeDefined()
  })
  describe('API DELETE /projects/:id', () => {
    test('should return 200', async () => {
      const response = await request.delete(`/projects/${id}`).set('Authorization', `Bearer ${accessToken}`)
      expect(response.statusCode).toBe(200)
    })
    test('should return 404', async () => {
      const response = await request.delete(`/projects/62e9211b39d5fd8065846452`).set('Authorization', `Bearer ${accessToken}`)
      expect(response.statusCode).toBe(404)
    })
  })
})

describe('API PUT project/:id', () => {
  test('should return 200', async  () =>{
    const response = await request.put(`/projects/${id2}`).set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'NewProjectName',
        status: 'Paused',
        startDate: '08/08/2022',
        endDate: '08/11/2022',
      })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', 'NewProjectName')
  })
  test('missing field should return 400', async  () =>{
    const response = await request.put(`/projects/${id2}`).set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'NewProjectName',
        startDate: '08/08/2022',
        endDate: '08/11/2022',
      })
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(
        expect.objectContaining({'endDate': 'ok', 'name': 'ok', 'startDate': 'ok', 'status': 'missing'}))
  })
})

// USER ROUTE

describe('API /users', () =>{

  test('it should return an array of username', async () =>{
    const response = await request.get('/users').set('Authorization', `Bearer ${accessToken}`)
    console.log(response.body)
    expect(response.statusCode).toBe(200)

  })

} )