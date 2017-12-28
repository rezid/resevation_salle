var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var moment = require('moment');
var config = require('./config/database'); // get db config file
var User = require('./models/user'); // get the mongoose model
var port = process.env.PORT || 3000;
var jwt = require('jwt-simple');
var Room = require('./models/room');
var Reservation = require('./models/reservation');
const validator = require('validator');
const { check, validationResult } = require('express-validator/check');
var bcrypt = require('bcrypt');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

//  Route (GET http://localhost:3000)
app.get('/', function (req, res) {


    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);



// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'uid, Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

// create a new user account (POST http://localhost:3000/api/signup)
apiRoutes.post('/signup', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');


    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.mobile || !req.body.password) {
        res.json({
            error: {
                code: '0x00001',
                message: 'first_name, last_name, email, mobile and password must be sets.'
            }
        });
    } else {

        var user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            date_of_birth: req.body.date_of_birth ? req.body.date_of_birth : undefined,
            mobile: req.body.mobile,
            avatar_url: req.body.avatar_url ? req.body.avatar_url : undefined,
            password: req.body.password
        });

        // save the user
        user.save(function (err, user) {
            if (err) {
                return res.json({
                    error: {
                        code: '0x00002',
                        message: err.message
                    }
                });
            }
            res.json({
                success: {
                    uid: user.id,
                    email: user.email
                }
            });
        });
    }
});

// login (POST http://localhost:3000/api/login)
apiRoutes.post('/login', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');


    if (!req.body.email || !req.body.password) {
        res.json({
            error: {
                code: '0x00004',
                message: 'email, and password must be sets.'
            }
        });
    } else {

        User.find({ email: req.body.email, password: req.body.password }, (err, users) => {
            if (users.length == 0) {
                return res.json({
                    error: {
                        code: '0x00005',
                        message: 'email, or password invalide.'
                    }
                });
            }

            // else
            return res.json({
                success: {
                    uid: users[0].id,
                    email: users[0].email
                }
            });

        });





        return;




    }
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', [

    check('id').isMongoId()

], function (req, res) {

    // Access-Control-Allow-Origin' header is required.
    res.header('Access-Control-Allow-Origin', '*');

    // validator.js check
    if (!validator.isMongoId(req.header('uid')))
        return res.send({ success: false, msg: 'User not authentified (uid not valid or not found!).' });;

    // else
    User.findById(req.header('uid'), function (err, user) {
        if (err) res.send({ success: false, msg: err.message });
        if (!user) {
            return res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            return res.send({ success: true, });
        }
    })
});

// list of all roooms  (GET http://localhost:8080/api/rooms)
apiRoutes.get('/rooms', function (req, res) {

    console.log('sdffddddddddddddddddddddddddddd');
    // Access-Control-Allow-Origin' header is required.
    res.header('Access-Control-Allow-Origin', '*');

    Room.find({}, function (err, rooms) {
        if (err) throw err;
        if (!rooms) {
            return res.send({ count: 0, rooms: [] });

        } else {
            return res.send({ count: rooms.length, rooms: rooms });
        }
    });
});

// insert one room (POST http://localhost:8080/api/rooms)
apiRoutes.post('/rooms', function (req, res) {
    // Access-Control-Allow-Origin' header is required.
    res.header('Access-Control-Allow-Origin', '*');

    if (!req.body.name || !req.body.description || !req.body.capacity ||
        !req.body.type || !req.body.room_number || !req.body.email_owner ||
        !req.body.price || !req.body.size || !req.body.street_number ||
        !req.body.street_name || !req.body.city || !req.body.postal_code ||
        !req.body.country) {
        return res.json({
            error: true,
            message: 'name, description, capacity, type, room_number, email_owner, ' +
                'price, size, street_number, street_name, city, postal_code, and country must be sets'
        });
    } else {

        var newRoom = new Room({
            name: req.body.name,
            description: req.body.description,
            capacity: req.body.capacity,
            type: req.body.type,
            room_number: req.body.room_number,
            email_owner: req.body.email_owner,
            price: req.body.price,
            size: req.body.size,
            street_number: req.body.street_number,
            street_name: req.body.street_name,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country,
        });
        // save the room
        newRoom.save(function (err) {
            if (err) {
                return res.json({ error: true, message: err.message });
            }
            return res.json({ error: false });
        });
    }
});

// Get room by id  (GET http://localhost:8080/api/rooms/:id)
apiRoutes.get('/rooms/:id', [
    check('id').isMongoId()
], function (req, res) {

    // Access-Control-Allow-Origin' header is required.
    res.header('Access-Control-Allow-Origin', '*');

    // validator.js check
    if (!validator.isMongoId(`${req.params.id}`))
        return res.send({ count: 0, rooms: [] });;

    // else
    Room.findById(req.params.id, function (err, room) {
        if (err) throw err;
        if (!room) {
            return res.send({ count: 0, rooms: [] });

        } else {
            return res.send({ count: 1, rooms: [room] });
        }
    });


});


//---------------------------------------------------------------------------------------------------------

// delete rooms
apiRoutes.get('/Rooms/room/deleteRoom', function (req, res) {
    var id = req.param('var', 'not found');
    console.log(id);
    Room.findOne({ _id: id }, function (err, room) {
        if (err) throw err;
        if (!room) {
            res.send({ success: false, msg: 'no room found of this name ... !!.' });
        }
        else {
            res.send({ success: true, msg: 'the room had been deleted', 'room informations ': room });
            console.log("This object will get deleted " + room);
            room.remove();
        }
    });


});
// rooms dispo
apiRoutes.get('/Rooms/room/roomDispo', function (req, res) {
    Room.find({ Etat: 'disponible' }, function (err, rooms) {
        if (err) throw err;
        var roomMap = {};

        rooms.forEach(function (room) {
            roomMap[room._id] = room;
        });

        res.send(roomMap);

    });

});
apiRoutes.post('/Rooms/room/reservation', function (req, res) {
    var idUser = req.param('iduser', 'not found');
    var idRoom = req.param('idroom', 'not found');
    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);

    Reservation.findOne({ idRoom: idRoom }, function (err, room) {
        if (err) throw err;
        if (room) {
            console.log('salle deja reserve !! la reservation termine le  : ' + room.endDate.getDate());

            if (
                startDate < room.endDate) {
                res.send({ success: false, msg: 'room is already reserved ' });
            }
            else {
                var newReservation = new Reservation({
                    idRoomer: idUser,
                    idRoom: idRoom,
                    startDate: new Date(req.body.startDate),
                    endDate: new Date(req.body.endDate)

                });
                // save the reservation
                newReservation.save(function (err) {
                    if (err) {
                        return res.json({ success: false, msg: ' ERROR !!!.', err: err.message });
                    }
                    res.json({ success: true, msg: 'Successful reserved new room.' });
                });
            }
        } else {
            var newReservation = new Reservation({
                idRoomer: idUser,
                idRoom: idRoom,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),

            });
            // save the reservation
            newReservation.save(function (err) {
                if (err) {
                    return res.json({ success: false, msg: ' ERROR !!!.', err: err.message });
                }
                res.json({ success: true, msg: 'Successful reserved new room.' });
            });
        }
    });


});

// recherche salle
apiRoutes.post('/Rooms/room/research', function (req, res) {
    if (!req.body.localisation && !req.body.type && !req.body.cap && !req.body.date) {
        console.log(' pas de param ')
        return res.json({ success: false, msg: 'veillez remplir au moin un champ .' });
    }

    else {
        if (!req.body.type && !req.body.cap && !req.body.date) {
            Room.find({ localisation: req.body.localisation }, function (err, rooms) {
                if (err) throw err;
                res.send(rooms);
            });
        } else {


            if (!req.body.cap && !req.body.date) {
                Room.find({ localisation: req.body.localisation, type: req.body.type }, function (err, rooms) {
                    if (err) throw err;
                    res.send(rooms);
                });
            } else {
                if (!req.body.date) {
                    Room.find(
                        {
                            localisation: req.body.localisation,
                            type: req.body.type,
                            capacite: req.body.cap
                        }
                        , function (err, rooms) {
                            if (err) throw err;
                            res.send(rooms);
                        });
                } else {
                    Room.find(
                        {
                            localisation: req.body.localisation,
                            type: req.body.type,
                            capacite: req.body.cap,
                            /**
                             *
                             * to do verification in the table of reservation with date
                             *
                             *
                             */
                        }
                        , function (err, rooms) {
                            if (err) throw err;
                            res.send(rooms);
                        });
                }

            }

        }






    }


});


// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                res.json({ success: true, msg: 'Welcome in the member area ' + user.name + '!' });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


// connect the api routes under /api/*
app.use('/api', apiRoutes);