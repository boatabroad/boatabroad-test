import type { VercelRequest, VercelResponse } from '@vercel/node';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from 'shared/utils/firebase';
import stripe from 'api/utils/stripe';
import validateSchema from './schema';
import { setProcessingPayment } from './utils';
import { validateBoatRental } from 'shared/utils/boat/validateBoatRental';

export const createPayment = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const { amount, id, userId, boatId } = req.body;
  const boat = (await getDoc(doc(collection(db, 'boats'), boatId))).data();
  const validation = validateBoatRental(boat);

  if (validation.error) {
    return res.status(validation.status).json({
      error: validation.error,
    });
  }

  try {
    await setProcessingPayment(boatId, true);
    await stripe.paymentIntents.create({
      amount,
      metadata: { userId, boatId },
      currency: 'USD',
      description: 'Example payment',
      payment_method: id,
      confirm: true,
    });

    res.json({
      message: 'Payment created',
    });
  } catch (error) {
    console.log('error creating payment', error);
    res.status(error.statusCode || 500).json({ error: error.message });
    await setProcessingPayment(boatId, false);
  }
};
