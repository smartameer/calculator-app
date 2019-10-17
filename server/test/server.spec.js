/**
 * Calculator
 * @author: smartameer
 */

var supertest = require("supertest")
var should = require("should")

const generateMockData = () => {
    const max = 1000
    const min = 10
    const x = min + Math.floor(Math.random() * (max - min))
    const y = min + Math.floor(Math.random() * (max - min))
    return {
        input1: x,
        input2: y,
        result: x * y
    }
}

describe("Calculator Application Test", () => {
    let server
    let request
    const mockData = generateMockData()

    beforeEach(() => {
        server = require('../server')();
        request = supertest(server)
    })

    afterEach((done) => {
        server.close()
        done()
    })

    after(() => {
        process.exit(0);
    })

    it("should save inputs and result to database", done => {
        request
            .post('/api/saveData')
            .send(mockData)
            .expect("Content-type", /json/)
            .expect(202)
            .end((err, res) => {
                res.status.should.equal(202)
                done()
            });
    });

    it("should get saved inputs and result from database", done => {
        request
            .get('/api/getData')
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200)
                res.body.should.deepEqual(mockData)
                done()
            });
    });

    it("should clear inputs and result from database", done => {
        request
            .delete('/api/clearData')
            .expect(204)
            .end(done)
    });

    it("should not get saved inputs and result from database", done => {
        request
            .get('/api/getData')
            .expect("Content-type", /json/)
            .expect(400)
            .end((err, res) => {
                res.status.should.equal(400)
                done()
            });
    });
});

