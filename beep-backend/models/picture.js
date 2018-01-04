
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/



// set up a mongoose model
var PictureSchema = new Schema({
    id_room: {
        type: String,
        required: true
    },

    img: {
        type: Blob,
        required: true
    },

});




module.exports = mongoose.model('Picture', RoomSchema);