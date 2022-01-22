import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import validateSchema from './schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const createPayment = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Example payment',
      payment_method: id,
      confirm: true,
    });

    console.log('payment was created', payment);

    res.json({
      message: 'Payment created',
    });
  } catch (error) {
    console.log('error creating payment', error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
