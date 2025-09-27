import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  const body = await req.json();
  const { priceId, customerEmail } = body;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
      },

      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=1`,

      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
