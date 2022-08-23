const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongo = require("./model/mongodb");
require('dotenv').config();


const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const  refreshTokenRouter = require("./routes/refreshToken.routes");
const logoutRouter = require("./routes/logout.routes")
const loginRouter = require("./routes/login.routes");
const forgotPasswordRouter = require("./routes/forgotpassword.routes");
const signinRouter = require("./routes/signin.routes");
const resetpasswordRouter = require("./routes/resetpassword.routes");
const movieRouter = require("./routes/movies.routes");
const hallRouter = require("./routes/halls.routes");
const bookedRouter = require("./routes/booked.routes");
const stripeRouter = require("./routes/stripe.routes")

const app = express();

(async()=>{

    app.use(credentials);
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(cookieParser());

    await mongo.connect();

    app.use("/login",loginRouter);
    app.use("/logout",logoutRouter);
    app.use("/signin",signinRouter);
    app.use("/forgotpassword",forgotPasswordRouter);
    app.use("/resetpassword",resetpasswordRouter);
    app.use("/movies",movieRouter);
    app.use("/refresh",refreshTokenRouter);
    app.use("/movies",movieRouter);
    app.use("/halls",hallRouter);
    app.use("/booked",bookedRouter);
    app.use("/stripe",stripeRouter)
})()

app.listen(process.env.PORT,() => {
    console.log(`App is listening to the port ${process.env.PORT}`);
})