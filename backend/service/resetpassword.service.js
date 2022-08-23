const bcryptjs = require('bcryptjs');

const helper = require("../helper/resetpassword.helper");

const service = {
    async resetPassword (req,res) {
        try{
            let {email,password} = req.body;
            console.log(email,password)
            if(email,password){
                const salt = await bcryptjs.genSalt(10);
                password = await bcryptjs.hash(password,salt)
                const response = await helper.updatePassword(email,password);
                console.log("password updated successfully",response);
                res.send("password changed successfully");
            }
        }
        catch(err){
            console.log("Error in resetting the password::", err);
            res.status(500).send("Error in resetting the password");
        }
    }
}

module.exports = service