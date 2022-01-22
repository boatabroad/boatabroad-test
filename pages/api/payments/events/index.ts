import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createPaymentEvent } from 'api/contorllers/payementEvents/createPaymentEvent';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return createPaymentEvent(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
