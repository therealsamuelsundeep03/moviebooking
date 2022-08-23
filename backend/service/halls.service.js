const { response } = require("express");
const helper = require("../helper/halls.helper");

const service = {
    // admin
    async hallDetails (req,res) {
        try{
            
            const { id,hallname,location,seats,price,movieDetails:movies } = req.body;
            
            // if all the details are received then proceed further or else send an error message.
            if(id && hallname && location && seats && price && movies){

                 // validate the feilds in the array...
                 movies.filter(({moviename,poster,langs,genre,firstShow,secondShow,thirdShow}) => {
                    if(moviename == "" || poster === "" ||langs=== "" || genre === "" || firstShow === "" || secondShow === "" || thirdShow === ""){
                        
                        // if all the feilds are not filled then send an error message
                        res.status(403).send("Fill All The Inputs");
                    }

                }) 

                // saving the hall details to the database.
                const response = await helper.addHallDetails(id,hallname,location,movies,price,seats);
                if(!response) res.sendStatus(202); //request received but cannot process
                res.status(200).send("Hall Details Added To The DB")
            }
            else{
                res.status(403).send("Fill All Inputs");
            }
        }
        catch(err){
            console.log("Error In Saving The Hall Details::", err);
        }
    },

    // if the hall already exists then add the movies to the hall and it belngs to the same admin.
    async addMovies(req,res) {
        try{
            const { id,hallname,location,seats,price,movieDetails:movies } = req.body;

            // if all the details are received then proceed further or else send an error message.
            if(id && hallname && location && seats && price && movies ){
        
                let err = false;

                 // validate the feilds in the array...
                 movies.filter(({moviename,poster,langs,genre,firstShow,secondShow,thirdShow}) => {
                    if(moviename == "" || poster === "" ||langs=== "" || genre === "" || firstShow === "" || secondShow === "" || thirdShow === ""){
                        
                        // if all the feilds are not filled then send an error message
                        res.status(403).send("Fill All The Inputs");
                        err = true;
                    }

                })         

                if(response && !err){
                    const response = await helper.addMovies(id,hallname,location,movies);
                    res.status(200).send("Hall Details Added To The DB");
                }
            }
            else{
                res.status(403).send("Fill All Inputs");
            }
        }
        catch(err){
            console.log("Error In Adding The Movie To The Halls::", err);
        }
    },

    // user to display halls
    async getHalls (req,res) {
        try{

            // getting the movie name from the params...
            const { movie } = req.params;
            const halls = [];

            // getting the hall name and it location and storing it in the halls array
            //  const response = await helper.getHallsOfAMovie(movie).forEach((doc) => {console.log(doc.id)})
            const response = await helper.getHallsOfAMovie(movie).forEach(({hallname,location,price,seats,movies,id}) => halls.push({hallname,location,price,seats,id,"movies" : movies.filter(mov =>  mov.moviename === movie ? mov.langs : null )}));

            // if the array is empty then there are halls based on the movie name
            if(!halls.length) res.sendStatus(204) //not content.

            if(halls.length) res.status(200).send(halls);
            console.log(`Halls Of ${movie}::`, halls);
        }   
        catch(err){
            console.log("Error in getting the halls::",err);
            res.status(500).send("Error in getting the halls");
        }
    },
    // to check if the admin is adding a new hall or an existing hall or hall owned by another admin
    async getHall(req,res) {
        try{
            const {id,hallname,location,seats,price} = req.body;

            if(id && hallname && location && seats && price) {
                // check if the hall exists by the parameters of its id, location, hallname
                const response = await helper.isHallExist(hallname,location);
                if(!response){
                    
                    // there is no hall in this hall name therefore it is validated to be created.
                    res.status(200).send("hall doesn't exists")
                }else if(response.id !== id){

                    // then there is a hall and location but doesn't belong to the current admin
                    // therefore send an error message
                    res.sendStatus(406) //not accetable
                }else if(response.id === id){

                    // hall is owned by the current admin and wishes to add movies to the hall
                    res.status(200).send("hall exists");
                }

            }else{
                res.sendStatus(403); //forbidden;
            } 
        }
        catch(err){
            console.log("Error in getting the halls::",err);
            res.status(500).send("Error in getting the halls");
        }
    },

    // to get hall details for the admin
    async getHallDetails (req,res) {
        try{
            const { id } = req.params;

            if(!id) res.sendStatus(403) //forbidden

            const hallDetails = []
            const response = await helper.getHallForAdmin(id).forEach(({hallname,location,movies}) => movies.map(({moviename}) => {hallDetails.push({hallname,location,moviename})}));
            res.status(200).send(hallDetails);
        }
        catch(err){
            console.log("Error in getting the halls::", err);
            res.status(500).send("Error in getting the halls");
        }
    }
}
module.exports = service; 
