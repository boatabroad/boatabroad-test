import type { VercelRequest, VercelResponse } from '@vercel/node';
import { collection, doc, getDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from 'shared/utils/firebase';
import stripe from 'api/utils/stripe';
import validateSchema from './schema';
import { createBoatRental, cancelBoatRental } from './utils';
import { validateBoatRental } from 'shared/utils/boat/validateBoatRental';

export const createPayment = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const { id, userId, boatId, amount, currency, date } = req.body;
  const boatRentalId = uuid();
  let boat: any = await getDoc(doc(collection(db, 'boats'), boatId));
  boat = { id: boat.id, ...boat.data() };
  const validation = await validateBoatRental(
    boat,
    amount,
    currency,
    date,
    true
  );

  if (validation.error) {
    return res.status(validation.status).json({
      error: validation.error,
    });
  }

  try {
    await createBoatRental(
      boatId,
      boatRentalId,
      userId,
      amount,
      currency,
      date
    );
  } catch (error) {
    return res.status(500).json({
      error:
        'There was an error processing your payment. Please try again later.',
      meta: { error: error.message },
    });
  }

  try {
    await stripe.paymentIntents.create({
      amount: boat.price.amount * 100,
      metadata: { userId, boatId, boatRentalId },
      currency: boat.price.currency,
      description: `Rental of boat ${boatId} for $${boat.price.amount} ${boat.price.currency}`,
      payment_method: id,
      confirm: true,
    });

    res.json({
      message: 'Payment created',
    });
  } catch (error) {
    console.log('error creating payment', error);
    res.status(error.statusCode || 500).json({ error: error.message });
    await cancelBoatRental(boatId, boatRentalId);
  }
};
