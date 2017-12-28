
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var ReservationSchema = new Schema({
    id_room: {
        type: String,
        required: true
    },

    start_date: {
        type: Date,
        required: true
    },
    
    end_date: {
        type: Date,
        required: true
    },
});




module.exports = mongoose.model('Reservation', ReservationSchema);