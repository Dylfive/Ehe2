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

function getSanitizedStripeKey(): {
  key: string;
  rawLength: number;
  hadWhitespaceOrNewlines: boolean;
  isConfigured: boolean;
} {
  const rawKey =
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_KEY ||
    process.env.STRIPE_API_KEY ||
    "";

  // Remove surrounding quotes, carriage returns, newlines, tabs, and outer whitespace
  const sanitized = rawKey
    .replace(/^["']|["']$/g, "")
    .replace(/[\r\n\t]/g, "")
    .trim();

  const hadWhitespaceOrNewlines = rawKey.length > 0 && rawKey !== sanitized;
  const isConfigured = Boolean(
    sanitized && (sanitized.startsWith("sk_") || sanitized.startsWith("rk_"))
  );

  return {
    key: sanitized,
    rawLength: rawKey.length,
    hadWhitespaceOrNewlines,
    isConfigured,
  };
}

function getStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
    timeout: 20000,
    maxNetworkRetries: 2,
  });
}

export async function GET() {
  const { key, isConfigured, hadWhitespaceOrNewlines } = getSanitizedStripeKey();

  let keyType = "none";
  if (key.startsWith("sk_test_")) keyType = "sk_test (Sandbox/Test)";
  else if (key.startsWith("sk_live_")) keyType = "sk_live (Live Mode)";
  else if (key.startsWith("rk_test_")) keyType = "rk_test (Restricted Test)";
  else if (key.startsWith("rk_live_")) keyType = "rk_live (Restricted Live)";
  else if (key) keyType = "custom";

  return Response.json({
    status: "ok",
    stripeConfigured: isConfigured,
    keyType,
    hadWhitespaceOrNewlines,
    httpClient: "FetchHttpClient",
  });
}

export async function POST(request: Request) {
  const { key: secretKey, isConfigured } = getSanitizedStripeKey();
  if (!isConfigured) {
    return Response.json(
      {
        error:
          "Stripe is not configured. Please ensure STRIPE_SECRET_KEY is set in your Vercel project settings and trigger a redeploy.",
      },
      { status: 500 }
    );
  }

  const stripe = getStripeClient(secretKey);

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
  } catch (err: unknown) {
    const errorObj = err as Record<string, unknown> | undefined;
    const message = err instanceof Error ? err.message : "Unknown error";
    const detail =
      typeof errorObj?.detail === "object" && errorObj.detail !== null
        ? (errorObj.detail as { message?: string; code?: string }).message ||
          (errorObj.detail as { message?: string; code?: string }).code ||
          ""
        : typeof errorObj?.detail === "string"
        ? errorObj.detail
        : "";
    const type = typeof errorObj?.type === "string" ? errorObj.type : "";
    const code = typeof errorObj?.code === "string" ? errorObj.code : "";

    console.error("[Stripe] Checkout session error:", { message, detail, type, code });

    const errorDetails = [message, detail, code].filter(Boolean).join(" — ");
    return Response.json(
      { error: `Failed to create checkout session: ${errorDetails || message}` },
      { status: 500 }
    );
  }
}

