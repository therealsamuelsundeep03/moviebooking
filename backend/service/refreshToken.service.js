const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginHelper = require("../helper/login.helper");

const service = {
    async refreshToken (req,res) {
        try{
            // checking for the cookie
            const cookies = req.cookies;
            // if the user expires his refresh token
            if(!cookies.jwt) return res.sendStatus(401);

            // if there are cookies then check if the token matches with the one in the db or else send an error
            const RefreshToken = cookies.jwt;
            
            const userRefreshToken = await loginHelper.findLoggedInUserByRefreshToken(RefreshToken);
            // if unknown user is trying to access the token
            if(!userRefreshToken) return res.sendStatus(400);

            // if the token exists then check it with the one in the env 
            jwt.verify(
                RefreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err,decoded) => {
                    // if the username and the username in the refresh token are same then issue access token or else send an error
                    if(err || userRefreshToken.username !== decoded.username) res.sendStatus(401);
                    const accessToken = jwt.sign(
                        {"username":decoded.username},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn : '30s'}
                    );

                    res.json({ accessToken })
                }
            )
        }
        catch(err){
            console.log("Error in refresh tokens::", err);
        }
    }
}

module.exports = service;