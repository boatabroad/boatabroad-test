import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'shared/utils/firebase';

export const cancelBoatRental = async (
  boatId: string,
  boatRentalId: string
) => {
  const boatRental = doc(db, `boats/${boatId}/rentals`, boatRentalId);

  return deleteDoc(boatRental);
};

export const createBoatRental = async (
  boatId: string,
  boatRentalId: string,
  userId: string,
  amount: boolean,
  currency: string,
  date: string
) => {
  await setDoc(doc(db, `boats/${boatId}/rentals`, boatRentalId), {
    userId,
    processingPayment: true,
    date,
    price: { amount, currency },
  });
};
