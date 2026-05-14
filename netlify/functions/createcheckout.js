const Stripe = require("stripe"); 

const stripe = Stripe("PUT_YOUR_SECRET_KEY_HERE");

exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Website Product",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: "https://www.flowersonmainshop.com/success.html",
      cancel_url: "https://www.flowersonmainshop.com/cancel.html",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: session.id,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
