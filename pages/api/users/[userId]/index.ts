import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setRole } from 'api/contorllers/users/setRole';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'PATCH') {
    return setRole(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
