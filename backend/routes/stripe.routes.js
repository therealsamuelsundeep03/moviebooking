const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const helper = require("../helper/booked.helper");

require('dotenv').config();


const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {

  if(!req.body.userId) {
    res.sendStatus(403);
  }else if(!req.body.id) {
    res.sendStatus(400)
  }
  else{
    const customer = await stripe.customers.create({
      metadata:{
        userId: req.body.userId,
        ticketDetails:JSON.stringify(req.body)
      }
    })
      
    const line_items = [req.body].map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Movie Ticket',
          },
          unit_amount: item.Price*100,
        },
        quantity: item.movieTickets.length,
      }
    })
  
    const session = await stripe.checkout.sessions.create({
      customer:customer.id,
      line_items,
      mode: 'payment',
      success_url: 'https://bookmiimovie.netlify.app/checkout-success',
      cancel_url: 'https://bookmiimovie.netlify.app/checkout-failure',
    });

    // console.log("session reached")
    res.send({session : session.url});
      
  }
});

const createOrder = async(customer,data) => {
  let ticketDetails = JSON.parse(customer.metadata.ticketDetails);
  
  const newOrder = {
    id:ticketDetails.id,
    movie:ticketDetails.Movie,
    time:ticketDetails.Time,
    showDay:ticketDetails.Day,
    selectLang:ticketDetails.Language,
    selectedSeats:ticketDetails.movieTickets,
    location:ticketDetails.Location,
    hallname:ticketDetails.hallname,
    price:ticketDetails.Price,
    userId:customer.metadata.userId,
    customerId:data.customer,
  };

  console.log("new order::", newOrder);
  console.log("ticket details::", ticketDetails);

  

  try{
    // saving data to the database
    const response = await helper.addTickets(newOrder);
    console.log("Ticket Booked::", response);

    // sending mail about the movie details.
    const html = `
    <h1>Book My Movie</h1>
    <h3>Your booking is confirmed</h3>
    <div>Ticket Details<div>
    <div>Movie: ${ticketDetails.Movie}</div>
    <div>Time: ${ticketDetails.Time}</div>
    <div>Day: ${ticketDetails.Day}</div>
    <div>Language: ${ticketDetails.Language}</div>
    <div>Hall Name: ${ticketDetails.hallname}</div>
    <div>Location: ${ticketDetails.Location}</div>
    <div>Amout Paid: ${ticketDetails.Price}</div>
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
        to: newOrder.userId, 
        subject: "Email Confirmation", 
        text: "Let's confirm your email address", 
        html: html
    }).then(info => {
        console.log({info});
    }).catch(err => {
        console.log(err);
    });

  }
  catch(err){
    console.log("Error in saving to the database::",err)
  }
}

let endpointSecret;
// endpointSecret = "whsec_3345cbdc8921c920c1552b2ed7b2827e03e803e2ea3e32c1b66d431ed89e9826"

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let data;
    let eventType;

    if(endpointSecret){
      try {
        let event;
        // to check that the event that caused the webhook comes from the stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("webhook verified");

        data = event.data.Object;
        eventType=event.type
      } catch (err) {
        console.log("Webhook error::", err.message)
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    }else{
      data=req.body.data.object;
      eventType=req.body.type
    }

    console.log(eventType);

    // Handle the event
    if(eventType === "checkout.session.completed"){

      stripe.customers.retrieve(data.customer).then((customer) => {
        console.log("creating order");
        createOrder(customer,data)
      })
      .catch(err => {
        console.log(err.message);
      })
    }
  
    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  });

  module.exports = router