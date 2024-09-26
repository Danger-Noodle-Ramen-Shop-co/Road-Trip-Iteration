const Trip = require('../models/tripModel.js')
//server/models/userModel.js
const tripController = {
    saveTrip: function(req, res, next){
        // const { destination, origin, step, waypoints, waypointStr } = req.body;
        
        //retrieve the information from req body Object
            //create a document using the trip model and req body
            //return next
        //if there is an error handle in next
        Trip.create(req.body)
        .then((el) => {
            // res.locals.send(req.body)
            return next()
        })
        .catch((err) => {return next(err)})
    },
    createTripEl: function(req, res, next){
        //if it has made it to this people then the document was successfully add
        //add the req body to the state
    },
    getTrip: function(req, res, next){
        // logic here
    }
}

module.exports = tripController