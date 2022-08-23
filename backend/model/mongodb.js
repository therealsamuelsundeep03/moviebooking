const { MongoClient } = require("mongodb");

const mongo = {
    db : null,

    async connect () {
        const client =  new MongoClient("mongodb+srv://samuel:plmqazsam123@guvi-experiment.etqqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true });  //{unifiedTopology : true}
        await client.connect()
            .then(() => {
                console.log("connected to the database");
            })
            .catch(err => {
                console.log("Error in connecting the databse::", err);
            })

        this.db = client.db("ticketbooking");
        console.log("database selected")
    }
}

module.exports = mongo;