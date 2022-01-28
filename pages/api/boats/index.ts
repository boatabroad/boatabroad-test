import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createBoat } from 'api/contorllers/boats/createBoat';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return createBoat(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
