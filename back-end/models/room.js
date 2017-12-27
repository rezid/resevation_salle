
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    Descreption: {
        type: String,
        required: true
    },

    localisation: {
        type: String,
        required: false
    },
    capacite: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    equipement: {
        type: String,
        required: false
    },
    Etat: {
        type: String,
        required: false
    }

});




module.exports = mongoose.model('Room', RoomSchema);