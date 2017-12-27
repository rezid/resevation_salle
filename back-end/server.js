var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var moment      = require('moment');
var config      = require('./config/database'); // get db config file
var User        = require('./models/users'); // get the mongoose model
var port        = process.env.PORT || 3000;
var jwt         = require('jwt-simple');
var Room = require('./models/room');
var Reservation = require('./models/reservation');
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

//  Route (GET http://localhost:3000)
app.get('/', function(req, res) {


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

// create a new user account (POST http://localhost:3000/api/signup)
apiRoutes.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password) {
        console.log(' pas de param ')
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {

        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.',err : err.message});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                    console.log(" user  found "+ req.body.name)
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

// route to authenticate a user (POST http://localhost:3000/api/authenticate)
// list of roooms...
apiRoutes.get('/Rooms', function(req, res) {
        Room.find({}, function(err, rooms) {
            if (err) throw err;
            if(!rooms ){
                res.send({msg : 'no room found !! '});

            }else{
                console.log(typeof(rooms));
                res.send(rooms);

            }
        });

});

//insert rooms
apiRoutes.post('/Rooms/room/insertRoom', function(req, res) {
    if (!req.body.roomName || !req.body.Descreption || !req.body.Etat) {
        console.log(' pas de param ')
        res.json({success: false, msg: 'Please pass roomName & description.'});
    } else {

        var newRoom = new Room({
            roomName: req.body.roomName,
            Descreption: req.body.Descreption,
            Etat:req.body.Etat,
            localisation:req.body.localisation,
            type:req.body.type,
            capacite:req.body.cap

        });
        // save the room
        newRoom.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'room exists.',err : err.message});
            }
            res.json({success: true, msg: 'Successful created new room.'});
        });
    }
});

// delete rooms
apiRoutes.get('/Rooms/room/deleteRoom', function(req, res) {
    var id = req.param('var','not found');
    console.log(id);
    Room.findOne({_id: id}, function (err, room){
        if (err) throw err;
        if (!room) {
            res.send({success: false, msg: 'no room found of this name ... !!.'});
        }
        else {
            res.send({success: true, msg : 'the room had been deleted','room informations ' : room});
            console.log("This object will get deleted " + room);
            room.remove();
        }
    });


});
// rooms dispo
apiRoutes.get('/Rooms/room/roomDispo', function(req, res) {
    Room.find({Etat: 'disponible'}, function(err, rooms) {
        if (err) throw err;
        var roomMap = {};

        rooms.forEach(function(room) {
            roomMap[room._id] = room;
        });

        res.send(roomMap);

    });

});
apiRoutes.post('/Rooms/room/reservation', function(req, res) {
        var idUser = req.param('iduser','not found');
        var idRoom = req.param('idroom','not found');
        var startDate = new Date(req.body.startDate);
        var endDate = new Date(req.body.endDate);

        Reservation.findOne({ idRoom: idRoom }, function(err, room) {
        if (err) throw err;
        if (room) {
            console.log('salle deja reserve !! la reservation termine le  : '+room.endDate.getDate());

            if(
                startDate < room.endDate ){
                res.send({success: false, msg: 'room is already reserved '});
            }
            else {
                var newReservation = new Reservation({
                    idRoomer: idUser,
                    idRoom: idRoom,
                    startDate:new Date(req.body.startDate),
                    endDate:new Date(req.body.endDate)

                });
                // save the reservation
                newReservation.save(function(err) {
                    if (err) {
                        return res.json({success: false, msg: ' ERROR !!!.',err : err.message});
                    }
                    res.json({success: true, msg: 'Successful reserved new room.'});
                });
            }
        } else {
            var newReservation = new Reservation({
                idRoomer: idUser,
                idRoom: idRoom,
                startDate:new Date(req.body.startDate),
                endDate:new Date(req.body.endDate),

            });
            // save the reservation
            newReservation.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: ' ERROR !!!.',err : err.message});
                }
                res.json({success: true, msg: 'Successful reserved new room.'});
            });
        }
    });


});

// recherche salle
apiRoutes.post('/Rooms/room/research', function(req, res) {
    if (!req.body.localisation && !req.body.type && !req.body.cap && !req.body.date  ) {
        console.log(' pas de param ')
        return res.json({success: false, msg: 'veillez remplir au moin un champ .'});
    }

    else{
        if(!req.body.type && !req.body.cap && !req.body.date){
            Room.find({localisation: req.body.localisation}, function(err, rooms) {
                if (err) throw err;
                res.send(rooms);
            });
        }else {


            if (!req.body.cap && !req.body.date) {
                Room.find({localisation: req.body.localisation, type: req.body.type}, function (err, rooms) {
                    if (err) throw err;
                    res.send(rooms);
                });
            }else{
                if( !req.body.date){
                    Room.find(
                        {  localisation: req.body.localisation,
                            type: req.body.type,
                            capacite: req.body.cap
                        }
                        , function(err, rooms) {
                        if (err) throw err;
                        res.send(rooms);
                    });
                }else{
                    Room.find(
                        {  localisation: req.body.localisation,
                            type: req.body.type,
                            capacite: req.body.cap,
                            /**
                             *
                             * to do verification in the table of reservation with date
                             *
                             *
                             */
                        }
                        , function(err, rooms) {
                            if (err) throw err;
                            res.send(rooms);
                        });
                }

            }

        }






    }


});


// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
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