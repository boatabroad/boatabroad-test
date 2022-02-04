import type { VercelRequest, VercelResponse } from '@vercel/node';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from 'shared/utils/firebase';
import validateSchema from './schema';

export const createBoat = async (req: VercelRequest, res: VercelResponse) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const boatId = uuid();

  await setDoc(doc(db, 'boats', boatId), {
    ...req.body,
    createdAt: new Date(),
    rentMinuteInterval: 60,
    published: false,
  });

  res.json({ message: 'Boat created successfully', id: boatId });
};
