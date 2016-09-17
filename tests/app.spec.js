var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var app = require('../app');
var Puppy = require('../models/schema');
chai.use(chaiHttp);

describe('The Puppies API', function() {
  it('should list ALL puppies when on api/puppies', function(done) {
    chai.request(app)
      .get('/api/puppies')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should list a SINGLE puppy when on api/puppies/<id>', function(done) {
    // var newPuppy = new Puppy.getSinglePuppy({
    //   id: 1,
    //   name: 'Super',
    //   breed: 'man',
    //   age: 1,
    //   sex: 'm'
    // });

    chai.request(app)
      .get('/api/puppies/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should add a SINGLE blob on api/puppies POST');

  it('should update a SINGLE blob on api/puppies/<id> PUT');

  it('should delete a SINGLE blob on api/puppies/<id> DELETE');
});
