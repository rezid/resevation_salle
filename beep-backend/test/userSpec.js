let mongoose = require("mongoose");
let User = require('../models/user.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../serverTest');
let should = chai.should();

chai.use(chaiHttp);

var user = new User({
    first_name: 'Kahoul',
    last_name: 'Abdelhafid',
    email: 'abdelhafidkahoul@gmail.com',
    date_of_birth: undefined,
    mobile: '0659148824',
    avatar_url:undefined,
    password: '23456'
});

var res = {
    success: {
        uid: user.id,
        email: user.email
    }
};

describe('Users Operations Test ', () => {
    beforeEach(
        (done) => {
                done();
        });
    describe('/post user', () => {
        it('it should get succes for signing up and creat a new user', (done) => {
            chai.request(server)
                .post('/api/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});


