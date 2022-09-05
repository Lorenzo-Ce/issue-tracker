const app = require('../app');
const request = require('supertest')(app);
const { createUser, createProject, setAccessToken, 
        deleteUser, deleteProject, addProjectIssue} = require('./utils/setDB')

const randomId = require('mongoose').Types.ObjectId()
let id
let accessToken
beforeAll(async () => {
    await createUser('testIssueAccount', 'issue@test.com', 'test12345')
    id = await createProject('testIssueAccount','testIssueProject', 'Open', {'Manager': ['testIssueAccount']})
    accessToken = await setAccessToken('testIssueAccount') 
    await addProjectIssue( 'testIssueProject', 
        {_id: 'TES-0', 'name': 'Issue', 'openingDate': '08/08/2021', 'label': 'Todos', 'priority': 'Normal'})
    await addProjectIssue('testIssueProject', 
        {_id: 'TES-1', 'name': 'Issue', 'openingDate': '08/08/2021', 'label': 'Todos', 'priority': 'Low'})
})

afterAll(async () => {
    deleteProject('testIssueProject')
    deleteProject('NewProjectName')
    deleteUser('testIssueAccount')
})
      
describe('API GET /:projectId/Issues', () => {
    test('it should return 200', async () =>{
        const response = await request.get(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.arrayContaining([{"_id": "TES-1", "comments": [], "images": [], "label": "Todos", "name": "Issue", "openingDate": "2021-08-07T22:00:00.000Z", "priority": "Low"}, {"_id": "TES-0", "comments": [], "images": [], "label": "Todos", "name": "Issue", "openingDate": "2021-08-07T22:00:00.000Z", "priority": "Normal"}
        ]))
    })
    test('missing Project it should return 400', async () => {
        const response = await request.get(`/projects/${randomId}/issues`).set('Authorization', `Bearer ${accessToken}`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({'error' : 'project not found'}))
    })
    describe('API DELETE /:projectId/Issues', () => {
        test('it should return 200', async () => {
            const response = await request.delete(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
            .send({
                '_id':'TES-0'
            })
            expect(response.statusCode).toBe(200)
        })
        test('missing req. field should return 400', async () => {
            const response = await request.post(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
            .send({})
            expect(response.statusCode).toBe(400)
            expect(response.body).toEqual(expect.objectContaining({'error' : 'one or more required fields are missing'}))
        })
    })    
})

describe('API POST /:projectId/Issues', () => {
    test('it should return 201', async () => {
        const response = await request.post(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
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
        const response = await request.post(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
        .send({
            'name': 'testIssue3',
            'priority': 'Normal',
            'description': 'Lorem Ipsum, dolor sit, amet, consectetur, adipisci velit.'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({'error' : 'one or more required fields are missing'}))
    })
})

describe('API PUT /:projectId/Issues', () => {
    test('it should return 200', async () => {
        const response = await request.put(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
        .send({_id: 'TES-1', 'name': 'ChangeName', 'openingDate': '10/08/2021', 'label': 'Todos'})
        expect(response.statusCode).toBe(200)
    })
    test('missing req. field should return 400', async () => {
        const response = await request.put(`/projects/${id}/issues`).set('Authorization', `Bearer ${accessToken}`)
        .send({ 'name': 'testIssue3', 'priority': 'Normal', 'description': 'Lorem Ipsum'})
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({'error' : 'one or more required fields are missing'}))
    })
})
