var expect = require('chai').expect;
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

/*
 * Test the /POST route
 */
describe('/POST users', () => {
  it('it should POST a user with firstName, emailId fields', (done) => {
    let user = {
      firstName: "Rahul",
      emailId: "rahulmankar26@gmail.com"
    }
    chai.request(app)
      .post('/users')
      .set('x-access-token', 'thisIsTestAssignmentToken')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        //assertions
        expect(res.body.message).to.be.equal("Auth OK");
        done();
      });
  });

});



/*
 * Test the /GET all users route
 */
describe('/GET users', () => {
  it('it should GET all users', (done) => {
    chai.request(app)
      .get('/users')
      .set('x-access-token', 'thisIsTestAssignmentToken')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        //assertions
        expect(res.body.message).to.be.equal("Auth OK");
        expect(res.body.users).to.be.a("array");
        expect(res.body.users[0].firstName).to.be.a("string");
        done();
      });
  });

});
/*
 * Test the /GEt route
 */
describe('/GET users/:id', () => {
  it('it should GET a user by userId', (done) => {
    chai.request(app)
      .get('/users/5da6f2e797e1cbfd9d151766')
      .set('x-access-token', 'thisIsTestAssignmentToken')
      .end((err, res) => {
        expect(res.body.user.firstName).to.be.a("string");
        res.should.have.status(200);
        expect(res.body.message).to.be.equal("Auth OK");
        done();
      });
  });
});
