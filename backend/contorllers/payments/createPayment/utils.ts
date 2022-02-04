import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import moment from 'moment-timezone';
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
  amount: number,
  currency: string,
  startDate: string,
  endDate: string
) => {
  await setDoc(doc(db, `boats/${boatId}/rentals`, boatRentalId), {
    userId,
    processingPayment: true,
    startDate: moment(startDate).toDate(),
    endDate: moment(endDate).toDate(),
    price: { amount, currency },
  });
};
