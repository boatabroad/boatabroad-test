import type { VercelRequest, VercelResponse } from '@vercel/node';
import { collection, doc, getDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from 'shared/utils/firebase';
import stripe from 'backend/utils/stripe';
import validateSchema from './schema';
import { createBoatRental, cancelBoatRental } from './utils';
import { validateBoatRental } from 'shared/utils/boat/validateBoatRental';
import { getBoatRentalAmount } from 'shared/utils/boat/getBoatRentalAmount';

export const createPayment = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const { id, userId, boatId, rentBy, amount, currency, startDate, endDate } =
    req.body;
  const boatRentalId = uuid();
  let boat: any = await getDoc(doc(collection(db, 'boats'), boatId));
  boat = { id: boat.id, ...boat.data() };
  const validation = await validateBoatRental(
    boat,
    rentBy,
    amount,
    currency,
    startDate,
    endDate,
    true
  );

  if (validation.error) {
    return res.status(validation.status).json({
      error: validation.error,
    });
  }

  const totalAmount = getBoatRentalAmount(boat, startDate, endDate);
  try {
    await createBoatRental(
      boatId,
      boatRentalId,
      userId,
      totalAmount,
      currency,
      startDate,
      endDate
    );
  } catch (error: any) {
    return res.status(500).json({
      error:
        'There was an error processing your payment. Please try again later.',
      meta: { error: error.message },
    });
  }

  try {
    await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      metadata: { userId, boatId, boatRentalId },
      currency: boat.price.currency,
      description: `Rental of boat ${boatId} for $${totalAmount} ${boat.price.currency}`,
      payment_method: id,
      confirm: true,
    });

    res.json({
      message: 'Payment created',
    });
  } catch (error: any) {
    console.log('error creating payment', error);
    res.status(error.statusCode || 500).json({ error: error.message });
    await cancelBoatRental(boatId, boatRentalId);
  }
};
