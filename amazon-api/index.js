const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.post("/payment/create", async (req, res) => {
  try {
    // SECURITY WARNING: In a production environment, you should never trust the client
    // to send the total amount. Instead, the client should send an array of item IDs and quantities,
    // and the backend should securely look up the prices in a database to calculate the total.
    // We use req.query.total here for simplicity in this clone.
    const total = Number(req.query.total);

    if (!total || total <= 0) {
      return res.status(400).json({
        error: "Invalid total amount",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  }
});
