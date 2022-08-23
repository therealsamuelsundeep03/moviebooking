const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
const { v4 : uuidv4 } = require ('uuid');
const bcryptjs = require('bcryptjs');
require('dotenv').config()

const helper = require("../helper/signin.helper");
const { findUserByEmail } = require("../helper/login.helper");

const service = {
    string:null,
    username:null,
    email:null,
    password:null,

    async signin (req,res) {
        try{
            this.username = req.body.username;
            this.email = req.body.email;
            this.password = req.body.password;
            this.confirmpassword = req.body.confirmpassword;

            if(this.username && this.email && this.password && this.confirmpassword){
                // check if the user email already exists
                const isUserExists = await findUserByEmail(email);
                if(isUserExists){

                    // if email exists then send user an error message
                    res.status(409).send("user exists"); // the request could not be processed because of conflict in the request
                }else{
                    this.string = ObjectId().toString();
                    const link = `https://bookmimovie.herokuapp.com/signin/${this.string}`

                    const html = `
                    <h1>Let's confirm your email address, To sign in please click on the link below</h1>
                    <a href=${link} target="_self" style="text-decoration:none;color: #fff;"><button style="outline:none;border:none;padding: 10px;width: 20rem;height:5rem;color: #fff;border-radius:5px;background-color: rgb(37, 58, 95);font-size:18px;color: #fff;font-size:18px">Click Here</button></a>
                    `

                    // if email doesn't exists then send a verification to the user email
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: {
                          user: 'hebestore6@gmail.com',
                          pass:'zzhrnlnhrhnujpoo',
                        },
                      });

                    transporter.sendMail({
                        from: '"Hebe" <hebestore6@gmail.com>', 
                        to: email, 
                        subject: "Email Confirmation", 
                        text: "Let's confirm your email address", 
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
                console.log("error")
                res.status(400).send("Fill all inputs")
            }
        }
        catch(err){
            console.log("Error in user signin::", err);
            res.send(500).send(`Error in user sign in::, ${err.message}`);
        }
    },

    async signinlink (req,res) {
        try{
            const confirmString = req.params.id;
            console.log(this.password)

            if(this.string === confirmString){
                // adding hash to the password
                const salt = await bcryptjs.genSalt(10);
                this.password = await bcryptjs.hash(this.password,salt);
                const id = uuidv4();
                
                // creating a new user
                const data = await helper.addUser(id,this.username,this.email,this.password);
                console.log("signed in successfully::", data);
                return res.redirect("https://bookmiimovie.netlify.app/verified");
            }
        }
        catch(err){
            console.log("Error in Signing the user::", err);
            res.status(500).send(`Error in signing the user::, ${err}`);
        }
    }
}

module.exports = service;