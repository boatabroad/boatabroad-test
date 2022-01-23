import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from 'shared/utils/firebase';

export const setProcessingPayment = async (boatId: string, value: boolean) => {
  const boat = doc(collection(db, 'boats'), boatId);

  return updateDoc(boat, {
    processingPayment: value,
  });
};
