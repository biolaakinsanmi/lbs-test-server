const { beforeAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../server');

const testClassroomName = 'Test Classroom Name';
const testClassroomDesc = 'Test Classroom Description';

describe('Classroom Endpoints', () => {

    // beforeAll(async () => {

    // })

    it('should create a new classroom', async () => {
        const res = await request(app).post('/api/classrooms').send({
            name: testClassroomName,
            description: testClassroomDesc
        })
        expect(res.statusCode).toEqual(201)
    })

    it('should get all classrooms', async () => {
        const res = await request(app).get('/api/classrooms')
        expect(res.statusCode).toEqual(200)
    })

    it('should get a classroom by id', async () => {
        const res = await request(app).get('/api/classrooms/1')
        expect(res.statusCode).toEqual(200)
    })
})