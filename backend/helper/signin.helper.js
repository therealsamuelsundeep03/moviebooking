const mongo = require("../model/mongodb");

const helper = {
    findUserByEmail(email){
        return mongo.db.collection('auth').findOne({email});
    },

    addUser(id,username,email,password){
        return mongo.db.collection('auth').insertOne({id,username,email,password});
    }
}

module.exports = helper;