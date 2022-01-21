import type { VercelRequest, VercelResponse } from '@vercel/node';

export const createPayment = (req: VercelRequest, res: VercelResponse) => {
  res.json({ message: 'Payment created' });
};
