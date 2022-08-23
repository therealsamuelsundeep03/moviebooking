const allowedOrigins = [
    "http://localhost:3000",
    "https://bookmiimovie.netlify.app"
]

const corsOptions = {
    origin: (origin,callback) => {
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus : 200,
}

module.exports = corsOptions