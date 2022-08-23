const helper = require("../helper/login.helper");

const service = {
    async logout (req,res) {
        const cookie  = req.cookies;

        // if no cookie then send an error message...
        if(!req?.cookies) res.sendStatus(204) //forbidden

        const refreshRoken = cookie.jwt;
        
        //check if the refresh token maches with the one in the loggedin db
        const findLoggedInUserByRefreshToken = await helper.findLoggedInUserByRefreshToken(refreshRoken);

        console.log("user present",findLoggedInUserByRefreshToken)
        if(!findLoggedInUserByRefreshToken) return res.sendStatus(403) //forbidden
        
        // then remove the user from logged in db
        const logout = await helper.removeLoggedInUser(refreshRoken);

        res.clearCookie('jwt',{httpOnly:true,secure:true,sameSite:'None'});
        res.sendStatus(204)
    }
}

module.exports = service;


//         if(!cookie?.jwt) return res.sendStatus(200); //no content

//         // // check if the refresh token in logged in database
//         const refreshToken = cookie.jwt;
//         const findLoggedInUserByRefreshToken = await helper.findLoggedInUserByRefreshToken(refreshToken);

//         console.log(findLoggedInUserByRefreshToken)
//         if(!findLoggedInUserByRefreshToken){
//             res.sendStatus(204); 
//             return res.clearCookie('jwt',{httpOnly:true})
//         }

//         // remove the refresh token from the database
//         const loggedIn = await helper.removeLoggedInUser(refreshToken);
//         console.log(loggedIn);
//         res.clearCookie('jwt',{httpOnly:true})
//         res.sendStatus(200)