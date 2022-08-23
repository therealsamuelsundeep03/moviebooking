const helper = require("../helper/booked.helper");
const mongo = require("../model/mongodb");

const service = {

    // get booked seats
    async getBookedSeats(req,res) {
        try{
            const {movie,hallname,location:loc,time:tim,showDay:showday,language} = req.params;
            const seatArr = [];
            const response = await helper.ticketDetails(movie,hallname).forEach(doc => [doc].filter(({location,showDay,selectLang,time,selectedSeats}) => ((location === loc && showDay === showday && time === tim && selectLang === language) ? selectedSeats.map(seat => seatArr.push(seat)) : "")));
            res.status(200).send(seatArr);

            // if all the details are not received then an err message
            if(!movie && !hallname && !loc && !tim && !showday && !language) res.sendStatus(403)
            
        }
        catch(err){
            console.log("Error in getting the user::",err);
            res.status(500).send("Error in getting the user")
        }
    },

    // get the customers info
    async getBookedInfo (req,res) {
        try{
            const { id } = req.params;
            if(!id) res.sendStatus(403) //forbidden
        
            let bookedInfo = []

            const response = await helper.customerDetails(id).forEach(doc => bookedInfo.push(doc));
            // const response = await helper.customerDetails(id).forEach(doc => console.log(doc));
            console.log(bookedInfo,id)
            res.status(200).send(bookedInfo);
        }
        catch(err){
            console.log("Error in getting the customers::",err);
            res.status(500).send("Error in getting the customer details")
        }
    }
}

module.exports = service;
