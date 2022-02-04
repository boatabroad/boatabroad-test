import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createPayment } from 'backend/contorllers/payments/createPayment';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return createPayment(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
