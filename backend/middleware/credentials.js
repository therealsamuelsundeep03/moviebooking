const allowedOrigins = [
    "http://localhost:3000",
    'http://localhost:8000', 
    "https://bookmiimovie.netlify.app" 
]

const credentials = ( req,res,next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
    }

    next();
}

module.exports = credentials