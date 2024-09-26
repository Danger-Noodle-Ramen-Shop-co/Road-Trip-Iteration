const mongoose = require('mongoose');

//schema
const tripSchema = mongoose.Schema({
    user_id: {type: Number},
    origin: { type: String, required: true },
    destination: {type: String, required: true},
    step: { type: Number, required: true },
    waypoints: { type: Array, required: true},

})

const Trips = mongoose.model('Trips', tripSchema)
module.exports = Trips