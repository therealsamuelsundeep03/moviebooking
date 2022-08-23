const mongo = require("../model/mongodb");

const helper = {
    findUserByEmail(email){
        return mongo.db.collection('auth').findOne({email})
    },

    loggedInUsers(username,email,password,refreshToken){
        return mongo.db.collection('loggedin').insertOne({username,email,password,refreshToken,"date":new Date()});
    },

    findLoggedInUser(email){
        return mongo.db.collection('loggedin').findOne({email})
    },

    findLoggedInUserByRefreshToken(refreshToken){
        return mongo.db.collection('loggedin').findOne({refreshToken})
    },

    removeLoggedInUser(refreshToken){
        return mongo.db.collection('loggedin').deleteOne({refreshToken})
    }
}

module.exports = helper;