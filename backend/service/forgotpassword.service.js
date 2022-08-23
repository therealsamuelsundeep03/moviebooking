const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");

const { findUserByEmail } = require("../helper/login.helper");

const service = {

    string: null,

   async confirmationEmailForForgotPassword (req,res) {
    try{
        const email = req.body.identityEmail;
        console.log(email)
        if(email){
            const response = await findUserByEmail(email);
            console.log(response)
            if(response === null){
                res.status(200).send("no user with this id");
                console.log("no user with this id"); 
            }
            else{
                    this.string = ObjectId().toString();
                    const link = `https://bookmimovie.herokuapp.com/forgotpassword/${this.string}`

                    const html = `
                    <h1>Let's confirm your email address, To reset password please click on the link below</h1>
                    <a href=${link} target="_self" style="text-decoration:none;color: #fff;"><button style="outline:none;border:none;padding: 10px;width: 20rem;height:5rem;color: #fff;border-radius:5px;background-color: rgb(37, 58, 95);font-size:18px;color: #fff;font-size:18px">Click Here</button></a>
                    `

                    // if email doesn't exists then send a verification to the user email
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: {
                          user: 'hebestore6@gmail.com',
                          pass: 'zzhrnlnhrhnujpoo',
                        },
                      });

                    transporter.sendMail({
                        from: '"Hebe" <hebestore6@gmail.com>', 
                        to: email, 
                        subject: "Email Confirmation", 
                        // text: "Let's confirm your email address", 
                        html: html
                    }).then(info => {
                        console.log({info});
                        res.status(200).send("check in email");
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send("Error in sending email")
                    });
            }
        }else{
            res.status(403).send("Enter Email Address");
        }
    }
    catch(err){
        console.log("Error in confirming the email::", err);
    }
   },
   async confirmStringForForgotPassword (req,res) {
        try{
            const confirmString = req.params.id;
            if(this.string.toString() === confirmString){
               return res.redirect("https://bookmiimovie.netlify.app/resetpassword");
            }
        }
        catch(err){
            console.log("Error in Signing the user::", err);
            res.status(500).send(`Error in signing the user::, ${err}`);
        }
   }
}

module.exports = service;