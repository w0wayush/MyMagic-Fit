const mongoose = require("mongoose");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.capturePayment = async (req, res) => {
  try {
    const { items } = req.body;

    // Validate the items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items must be a non-empty array" });
    }

    // Map cart items to Stripe format
    const cartItems = items.map((item) => {
      if (
        !item.name ||
        !item.image ||
        !item.price ||
        !item.quantity ||
        typeof item.price !== "number" ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        throw new Error("Invalid item data");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    // Check if the FRONTEND_URL environment variable is set
    if (!process.env.FRONTEND_URL) {
      throw new Error("FRONTEND_URL environment variable is not set");
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/successful-payment`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel-payment`,
    });

    // Respond with the session ID
    res.json({ id: session.id });
  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
