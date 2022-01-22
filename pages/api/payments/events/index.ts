import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    console.log('req.headers', req.headers);

    return res.json({ message: 'thanks!' });
    // return createPayment(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
