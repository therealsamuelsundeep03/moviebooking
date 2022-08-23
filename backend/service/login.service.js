const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const helper = require("../helper/login.helper");
require('dotenv').config();


const service = {
    async findUser (req,res) {
        try{
            const { email,password } = req.body;

            // if email and password are received then proceed or else send an error...
            if(email,password){
                const isUserExists = await helper.findUserByEmail(email);

                if(!isUserExists) return res.status(401).send("Email Doesn't Exists"); //unauthorized

                // if user exists then check password
                const match = await bcryptjs.compare(password,isUserExists.password);
                if(match){
                    const accessToken = jwt.sign(
                        {"username":isUserExists.username},
                        process.env.Access_Token_SECRET,
                        {expiresIn:"30s"}
                    )
                    const refreshToken = jwt.sign(
                        {"username":isUserExists.username},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn:"1d"}
                    )
                    
                    // sending the access tokens as well as refresh tokens
                    res.cookie('jwt',refreshToken,{httpOnly:true, sameSite:'None', secure:true, maxAge : 24*60*60*1000});
                    res.status(200).json({ accessToken,"id" : isUserExists.id })
    

                    console.log("logged in successfully::", isUserExists.id )

                    // adding user details to the logged in logged in database
                    const loggedIn = await helper.loggedInUsers(isUserExists.username,isUserExists.email,isUserExists.password,refreshToken);
                }else{
                    res.status(401).send("Password Is Incorrect");
                }
            }else{
                res.status(401).send("Fill All Inputs");
            }
        }
        catch(err){
            console.log("Error in logging in::", err);
            // res.status(500).send("Error in Logging in");
        }
    }
}

module.exports = service