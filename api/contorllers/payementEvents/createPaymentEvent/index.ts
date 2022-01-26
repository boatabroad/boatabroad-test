import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { associateBoatRentalWithUser, getStripeEvent } from './utils';

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
      const { userId, boatId, boatRentalId } = object.metadata;
      console.log(`user ${userId} paid for boat ${boatId}`);

      associateBoatRentalWithUser(boatId, boatRentalId).catch((error) => {
        console.error('Error while associating boat rental with user:', error);
      });
      break;
  }
};
