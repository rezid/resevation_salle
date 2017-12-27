
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var ReservationSchema = new Schema({
    idRoomer: {
        type: String,
        required: true
    },
    idRoom: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    reservationDate: {
        type: Date,
        default:Date.now()

    }

});




module.exports = mongoose.model('Reservation', ReservationSchema);