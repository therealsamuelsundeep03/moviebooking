const mongo = require("../model/mongodb");

const helper = {
    getMovies () {
        return mongo.db.collection("halls").find({});
    }
}

module.exports = helper;
