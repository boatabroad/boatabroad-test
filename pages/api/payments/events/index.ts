import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    res.json({ message: 'thanks!' });

    switch (req.body.type) {
      case 'payment_intent.succeeded':
        const { userId, boatId } = req.body.data.object.metadata;
        console.log('userId', userId);
        console.log('boatId', boatId);
        break;
    }

    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
