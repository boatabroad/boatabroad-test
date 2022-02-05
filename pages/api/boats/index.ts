import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createBoat } from 'backend/contorllers/boats/createBoat';
import { getBoats } from 'backend/contorllers/boats/getBoats';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return createBoat(req, res);
  }
  if (req.method === 'GET') {
    return getBoats(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
