
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");


const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  


const admin = require("firebase-admin");
setGlobalOptions({ maxInstances: 10 });


app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Firebase!" });
})



app.post("/payment/create", async (req, res) => {

    const total = req.query.total;
    if (total > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });
        console.log("Payment Intent Created:", paymentIntent);

        res.status(201).json({
          clientSecret: paymentIntent.client_secret,
        });
    } else {
        res.status(400).send({ error: "Invalid total amount" });
    }
        // res.send(total)
    }
    );
exports.api = onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
