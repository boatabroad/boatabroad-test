import { useEffect, useState } from 'react';
import StripeContainer from 'components/StripeContainer';
import { useRouter } from 'next/router';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from 'shared/utils/firebase';
import { ClimbingBoxLoader } from 'react-spinners';
import style from './style.module.css';
import { validateBoatRental } from 'shared/utils/boat/validateBoatRental';

const PaymentPage = () => {
  const router = useRouter();
  const { boatId } = router.query;
  const [boat, setBoat] = useState(null);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    if (!boatId) {
      return;
    }
    getDoc(doc(collection(db, 'boats'), boatId)).then((givenBoat) => {
      const data = { id: givenBoat.id, ...givenBoat.data() };
      const validation = validateBoatRental(data);
      if (validation.error) {
        setValidationError(validation.error);
      }
      setBoat(data);
    });
  }, [boatId]);

  if (validationError) {
    return <div className={style.loadingContainer}>{validationError}</div>;
  }

  if (!boat) {
    return (
      <div className={style.loadingContainer}>
        <ClimbingBoxLoader />
        We're searching for the boat...
      </div>
    );
  }

  return (
    <>
      <h1 className={style.title}>Rent this boat</h1>
      <StripeContainer boat={boat} />
    </>
  );
};

export default PaymentPage;
