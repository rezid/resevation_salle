
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/



// set up a mongoose model
var RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    street_number: {
        type: Number,
        required: true
    },

    street_name: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    postal_code: {
        type: Number,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    room_number: {
        type: Number,
        required: true
    },

    email_owner: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    size: {
        type: Number,
        required: true
    },

});




module.exports = mongoose.model('Room', RoomSchema);