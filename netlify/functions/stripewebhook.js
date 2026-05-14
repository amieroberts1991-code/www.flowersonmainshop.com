const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const sig = event.headers["stripe-signature"];
    let stripeEvent;

    try {
        const webhookEvent = stripe.webhooks.constructEvent(
            event.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return { status }
    }
    // Handle events 
        if (stripeEvent.type === "checkout.session.completed") {
            const session = stripeEvent.data.object;

            // TODO: Save to Airtable or send email
            console.log("Payment successful:", session.id);
        }

        return { statusCode: 200, body: "success" };

};
