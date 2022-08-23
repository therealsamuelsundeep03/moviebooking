const mongo = require("../model/mongodb");

const helper = {
    addHallDetails ( id,hallname,location,movies,price,seats ) {
        return mongo.db.collection("halls").insertOne({ id,hallname,location,movies,price,seats })
    },
    getHallsOfAMovie(movie) {
        return mongo.db.collection("halls").find({"movies.moviename":movie})
    },
    isHallExist(hallname,location){
        return mongo.db.collection("halls").findOne({hallname,location});
    },
    addMovies(id,hallname,location,movies){
        // filtering by id name and location of the hall
        return mongo.db.collection("halls").updateOne({ id,hallname,location },{ $push: {"movies" :  {$each : movies}} })
    },
    getHallForAdmin(id){
        return mongo.db.collection("halls").find({id})
    }
}

module.exports = helper;