const helper = require("../helper/movies.helper");

const service = {
    async sendMovies (req,res) {
        try{

            // response returns cursor obj from which we can retreive the doc...
            // extrate only the required feilds and send as a response
            let movieList = [];

            const response = await helper.getMovies().forEach(({movies,price,seats,id}) => {
                movies.map(({moviename,poster,langs,genre}) => {
                    movieList.push({id,moviename,poster,langs,genre,price,seats});
                })
            });

            movieList = [...movieList.reduce((map,obj) => map.set(obj.moviename,obj),new Map()).values()];
           
            res.status(200).send(movieList); 
            console.log("Movies List::", movieList);
        }
        catch(err){
            console.log("Error in getting the movies ::",err);
            res.status(500).send("Error in getting the code");
        }
    }
}

module.exports = service