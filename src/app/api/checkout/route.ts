import Stripe from "stripe";

// Shape of each item sent from the client
interface CheckoutItem {
  product: {
    id: string;
    name: string;
    price: number; // in dollars (e.g. 24.99)
    image: string;
    slug: string;
  };
  quantity: number;
}

export async function GET() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return Response.json({
    status: "ok",
    stripeConfigured: Boolean(secretKey && secretKey.startsWith("sk_")),
  });
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json(
      {
        error:
          "Stripe is not configured. Please ensure STRIPE_SECRET_KEY is set in your Vercel project settings and trigger a redeploy.",
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);

  let items: CheckoutItem[];
  try {
    const body = await request.json();
    items = body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Cart is empty." }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Determine application base URL dynamically from request headers or environment
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";

  let appUrl = origin;
  if (!appUrl && host) {
    appUrl = `${proto}://${host}`;
  }
  if (!appUrl) {
    appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  }
  appUrl = appUrl.replace(/\/+$/, "");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: item.product.name,
            images: item.product.image?.startsWith("http")
              ? [item.product.image]
              : [],
          },
          // Stripe requires amounts in the smallest currency unit (cents)
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${appUrl}/checkout/success/`,
      cancel_url: `${appUrl}/cart/`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Stripe] Checkout session error:", message);
    return Response.json(
      { error: `Failed to create checkout session: ${message}` },
      { status: 500 }
    );
  }
}
