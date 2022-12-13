var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8000/user');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWJhYmU4NGQwNTM3OWY3Mzg2YWYxOSIsImlhdCI6MTY2Njk1MjE2OSwiZXhwIjoxNjY3ODE2MTY5fQ.bnHVLMqBNZvrFXdpshwLa-W5f9Mm_JfO1MF_793dqIA'

describe('User unit testing', function(){
  this.timeout(150000)

  it('POST Login user with correct credentials 200 response',  function(done){
		api.post('/register')
	    .send({
        email:"tested@email.com",
        password:"123456789",
	    })
	    .expect(200,done);
	});
  it('POST Login user with correct credentials 200 response',  function(done){
		api.post('/login')
	    .send({
        email:"tested@email.com",
        password:"123456789",
	    })
	    .expect(200,done);
	});
  it('GET Transaction Details with correct Credentials', function(done)
  {
    api.get('/detail')
    .set('Authorization', 'Bearer ' + token)
    .expect(200,done);
  })

})
