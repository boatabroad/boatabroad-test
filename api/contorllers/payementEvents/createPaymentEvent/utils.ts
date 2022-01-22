import type { VercelRequest, VercelResponse } from '@vercel/node';
import stripe from 'api/utils/stripe';

const parseBody = (req: VercelRequest): Promise<string> =>
  new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(Buffer.from(data).toString());
    });
  });

export const getStripeEvent = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const signature = req.headers['stripe-signature'];
  const body = await parseBody(req);

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SIGNATURE_SECRET
    );

    return event;
  } catch (err) {
    console.error('Error while verifying webhook signature:', err);

    res.status(200).send(`Webhook Error: ${err.message}`);
    return null;
  }
};
