let mongoose = require("mongoose");
let Room = require('../models/room.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../serverTest');
let should = chai.should();

chai.use(chaiHttp);


var room1 = new Room({
    "name": "premier",
    "description": "salle des conférences ",
    "capacity": 50,
    "type": "party",
    "room_number": 2,
    "email_owner": "abdelhafidkahoul@gmail.com",
    "price": 500,
    "size": 200,
    "street_number": 5,
    "street_name": "carrefour",
    "city": "creteil",
    "postal_code": 94000,
    "country": "France",
});

var room2 = new Room({
    "name": "jhgjhg",
    "description": "blabla",
    "capacity": 25,
    "type": "music",
    "room_number": 23,
    "email_owner": "abdelhafidkahoul@gmail.com",
    "price": 100,
    "size": 50,
    "street_number": 2,
    "street_name": "carrefour",
    "city": "Paris",
    "postal_code": 75000,
    "country": "France",
});


describe('Rooms', () => {
    beforeEach(
        (done) => {
            Room.remove({},function () {
                console.log('clearing bd ')
            });
            room2.save();
            room1.save(function (err) {
               done();
            });

    });

    describe('/GET room', () => {
        it('it should GET all the rooms', (done) => {
            chai.request(server)
                .get('/api/rooms/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('count').eql(2);
                    done();
                });
        });
    });

    describe('/POST room', () => {
        it('it should POST a room ', (done) => {
            //res.json({ error: false, id_room: newRoom._id });
            chai.request(server)
                .post('/api/rooms/')
                .send(room1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('error').eql(false);
                    res.body.should.have.property('id_room');
                    done();

                });
        });

    });
});


