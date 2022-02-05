import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'shared/utils/firebase';
import validateSchema from './schema';

export const getBoats = async (req: VercelRequest, res: VercelResponse) => {
  validateSchema(req, res);
  if (res.headersSent) {
    return;
  }
  const { search, startDate, endDate } = req.query;
  const sailors = +req.query.sailors;
  const boatsQuery = query(
    collection(db, 'boats'),
    where('cityParts', 'array-contains', search),
    // where('startDate', '>=', startDate),
    // where('endDate', '<=', endDate),
    where('sailors', '==', sailors),
  );
  const startDateBoatRentalsQuery = query(
    collectionGroup(db, 'rentals'),
    where('startDate', '>', new Date(startDate as string)),
    where('startDate', '<', new Date(endDate as string)),
  );
  const endDateBoatRentalsQuery = query(
    collectionGroup(db, 'rentals'),
    where('endDate', '>', new Date(startDate as string)),
    where('endDate', '<', new Date(endDate as string)),
  );
  const [startDateBoatRentals, endDateBoatRentals] = await Promise.all([
    getDocs(startDateBoatRentalsQuery),
    // getDocs(endDateBoatRentalsQuery),
  ]);

  const boatRentals = startDateBoatRentals.docs.map((x) => ({
    ...x.data(),
    boatId: x.ref.parent.parent?.id,
  }));

  res.json({ boatRentals });
  // const boatDocs = await getDocs(boatsQuery);
  // const boats = boatDocs.docs.map((boatDoc) => ({
  //   ...boatDoc.data(),
  //   cityParts: undefined,
  //   typeParts: undefined,
  // }));

  // res.json({ boats });
};
