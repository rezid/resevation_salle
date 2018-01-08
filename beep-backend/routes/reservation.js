var express = require('express');
var User = require('../models/reservation.js');
const validator = require('validator');
const { check, validationResult } = require('express-validator/check');
var router = express.Router();

// add room reservation (POST http://localhost:8080/api/reservations)
apiRoutes.post('/', [
    check('id').isMongoId()
], function (req, res) {

    // Access-Control-Allow-Origin' header is required.
    res.header('Access-Control-Allow-Origin', '*');

    if (!req.body.id_room || !req.body.start_date || !req.body.end_date) {
        return res.json({
            error: true,
            message: 'id_room, start_date and end_date must be sets'
        });
    }

    // validator.js check
    if (!validator.isMongoId(`${req.body.id_room}`))
        return res.send({
            error: true,
            message: 'id_room not a valide mongodb id.'
        });;

    // create new reservation
    reservation = new Reservation({
        id_room: req.body.id_room,
        start_date: new Date(req.body.start_date.year, req.body.start_date.month - 1, req.body.start_date.day),
        end_date: new Date(req.body.end_date.year, req.body.end_date.month - 1, req.body.end_date.day),
    });


    // save the reservation
    reservation.save(function (err) {
        if (err) {
            return res.json({
                error: true,
                message: err.message
            });
        }
        res.json({
            error: false,
        });
    });
});

// Get all reservation for a room by id_room (GET http://localhost:8080/api/reservations:id_room)
apiRoutes.get('/:id_room', [
    check('id').isMongoId()
], function (req, res) {

    // Access-Control-Allow-Origin' header is required.
    res.header('Access-Control-Allow-Origin', '*');

    // validator.js check
    if (!validator.isMongoId(`${req.params.id_room}`))
        return res.send({ count: 0, reservations: [] });;

    // else
    Reservation.find({ id_room: req.params.id_room }, function (err, reservations) {
        if (err) throw err;
        if (!reservations) {
            return res.send({ count: 0, reservations: [] });

        } else {
            return res.send({ count: reservations.length, reservations: reservations });
        }
    });

});





module.exports = router;