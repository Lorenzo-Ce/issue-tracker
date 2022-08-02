const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { setRefreshToken, deleteUser, deleteProject, createUser } = require('./utils/setDB')

//API PROJECTS ROUTE

beforeAll(() => createUser('testAccount', 'test1@test.com', 'test12345'))
afterAll(() => {
  deleteProject('testProject')
  return  deleteUser('testAccount')
})


describe('API /projects', () => {
  
  test('POST should return 201', async () => {
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
    test('POST missing field should return 400', async () => {
      const response = await request.post('/projects')
        .set('Accept', 'application/json')
        .send(({
            name: 'testProject',
            status: 'Open',
        }))
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe('missing one or more required field')
      }) 
    test('POST no user found should return 400', async () => {
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
