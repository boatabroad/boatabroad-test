import { useEffect, useState } from 'react';
import StripeContainer from 'components/StripeContainer';
import { useRouter } from 'next/router';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { ClimbingBoxLoader } from 'react-spinners';
import sweetAlert from 'sweetalert';
import { db } from 'shared/utils/firebase';
import style from './style.module.css';
import { validateBoatRental } from 'shared/utils/boat/validateBoatRental';
import IfLoggedIn from 'components/IfLoggedIn';

const PaymentPage = () => {
  const router = useRouter();
  const { boatId } = router.query;
  const [boat, setBoat] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!boatId) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(collection(db, 'boats'), boatId),
      (givenBoat) => {
        const data = { id: givenBoat.id, ...givenBoat.data() };
        const validation = validateBoatRental(
          data,
          data.price.amount,
          data.price.currency
        );
        if (validation.error) {
          setError(true);
          sweetAlert('Validation error', validation.error, 'error').then(() => {
            router.push('/dashboard');
          });
        }
        setBoat(data);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [boatId]);

  if (error) {
    return <div />;
  }

  if (!boat) {
    return (
      <IfLoggedIn>
        <div className={style.loadingContainer}>
          <ClimbingBoxLoader />
          We're searching for the boat...
        </div>
      </IfLoggedIn>
    );
  }

  return (
    <IfLoggedIn>
      <h1 className={style.title}>Rent this boat</h1>
      <StripeContainer boat={boat} />
    </IfLoggedIn>
  );
};

export default PaymentPage;
