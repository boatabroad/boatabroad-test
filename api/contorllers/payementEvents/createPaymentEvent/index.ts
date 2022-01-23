import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { associateBoatWithUser, getStripeEvent } from './utils';

export const createPaymentEvent = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const event = await getStripeEvent(req, res);
  if (!event) return;
  res.json({ message: 'thanks!' });

  switch (event.type) {
    case 'payment_intent.succeeded':
      const object = event.data.object as Stripe.PaymentIntent;
      const { userId, boatId } = object.metadata;
      // TODO update the boat with the user id
      console.log('userId', userId);
      console.log('boatId', boatId);
      associateBoatWithUser(userId, boatId);
      break;
  }
};
