const app = require('../app');
const {refreshToken, wrongRefreshToken } = require('./utils/fakeData');
const request = require('supertest')(app);
const { createUser, createProject, 
      deleteUser, deleteProject, addProjectIssue} = require('./utils/setDB')

const randomId = require('mongoose').Types.ObjectId()
let id
beforeAll(async () => {
    await createUser('testIssueAccount', 'issue@test.com', 'test12345')
    id = await createProject('testIssueAccount','testIssueProject', 'Open', {'Manager': ['testIssueAccount']})
    addProjectIssue(
        'testIssueProject', 
        {'name': 'Issue',
        'openingDate': '08/08/2021',
        'label': 'Todos', 
        'priority': 'Normal',
        'description': 'Description about the issue'})
    }
)

afterAll(() => {
    deleteProject('testIssueProject')
    deleteProject('NewProjectName')
    deleteUser('testIssueAccount')
})
      
describe('API GET /:projectId/Issues', () => {
    test('it should return 200', async () =>{
        const response = await request.get(`/projects/${id}/issues`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.objectContaining([{
                "_id": expect.any(String), 
                "comments": expect.any(Array), 
                "description": "Description about the issue", 
                "images": expect.any(Array), 
                "label": "Todos", 
                "name": "Issue", 
                "openingDate": expect.any(String), 
                "priority": "Normal"}
            ])
        )
    })
    test('missing Project it should return 400', async () => {
        const response = await request.get(`/projects/${randomId}/issues`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({'error' : 'project not found'}))
    })
})    

describe('API POST /:projectId/Issues', () => {
    test('it should return 201', async () => {
        const response = await request.post(`/projects/${id}/issues`)
        .send({
            'name': 'testIssue2',
            'openingDate': new Date(),
            'label': 'Bug',
            'priority': 'Normal',
            'description': 'Lorem Ipsum, dolor sit, amet, consectetur, adipisci velit.'
        })
        expect(response.statusCode).toBe(201)
    })
    test('missing req. field should return 400', async () => {
        const response = await request.post(`/projects/${id}/issues`)
        .send({
            'name': 'testIssue3',
            'priority': 'Normal',
            'description': 'Lorem Ipsum, dolor sit, amet, consectetur, adipisci velit.'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({'error' : 'one or more required fields are missing'}))
    })
})