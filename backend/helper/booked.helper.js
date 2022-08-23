const mongo = require("../model/mongodb");

const helper = {

    addTickets (ticket) {
        return mongo.db.collection('booked').insertOne({...ticket})
    },

    ticketDetails (movie,hallname) {
        return mongo.db.collection("booked").find({movie},{hallname});
    },

    customerDetails (id){
        return mongo.db.collection("booked").find({id});
    }
}

module.exports = helper

