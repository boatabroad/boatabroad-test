import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'shared/utils/firebase';

export const setProcessingPayment = async (boatId: string, value: boolean) => {
  const boat = doc(collection(db, 'boats'), boatId);

  return updateDoc(boat, {
    processingPayment: value,
  });
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
