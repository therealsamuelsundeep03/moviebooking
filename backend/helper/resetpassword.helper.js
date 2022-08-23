const mongo = require('../model/mongodb');

const helper = {
    updatePassword (email,password) {
        return mongo.db.collection('auth').updateOne({email},{$set:{password}})
    }
}

module.exports = helper;