const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { setRefreshToken, deleteUser, createUser } = require('./utils/setDB')

//API PROJECTS ROUTE

beforeAll(() => createUser('testAccount', 'test1@test.com', 'test12345'))
afterAll(() => deleteUser('testAccount'))

describe('API /projects', () => {
  
  test('POST project should return 201', async () => {
    const response = await request.post('/project')
      .set('Accept', 'application/json')
      .send(({
          name: 'testProject',
          status: 'Open',
          members: [ {role : 'Admin', usernames : ['testAccount']}],
          issues : []
      }))
      expect(response.statusCode).toBe(201)
    })

})
