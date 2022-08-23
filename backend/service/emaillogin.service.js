const { ObjectId } = require('mongodb');

const { findUserByEmail } = require('../helper/login.helper');
const { addUser } = require("../helper/signin.helper");

const service = {
    async isUserExists (req,res) {
        try{
            const email = req.body.email;
            if(email){
                const response = await findUserByEmail(email);
                console.log(response);
                if(response){
                    res.status(200).json({"user":response._id});
                }
                else{
                    const response = await addUser(email);
                    console.log(response);
                    if(response){
                        res.status(200).json({"user":response._id});
                    }
                }
            }
        }
        catch(err){
            console.log("Error in confirming the user");
            res.status(500).send("Error in confirming the user");
        } 
    }
}

module.exports = service;