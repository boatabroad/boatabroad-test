import type { VercelRequest, VercelResponse } from '@vercel/node';
import admin from 'api/utils/firebase-admin';
import validateSchema from './schema';

const auth = admin.auth();

export const setRole = async (req: VercelRequest, res: VercelResponse) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const { role } = req.body;
  const { userId } = req.query;
  const user = await auth.getUser(userId as string).catch((error) => {
    res.status(500).json({ error: error.message });
  });

  if (!user) {
    return;
  }

  try {
    await auth.setCustomUserClaims(user.uid, { role });
    console.log('updated user', user.uid, 'role to', role);
    res.json({ message: 'role updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
