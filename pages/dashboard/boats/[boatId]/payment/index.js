import { useEffect, useRef, useState } from 'react';
import StripeContainer from 'components/StripeContainer';
import { useRouter } from 'next/router';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { ClimbingBoxLoader } from 'react-spinners';
import sweetAlert from 'sweetalert';
import { db } from 'shared/utils/firebase';
import style from './style.module.css';
import { validateBoatRental } from 'shared/utils/boat/validateBoatRental';
import IfLoggedIn from 'components/IfLoggedIn';
import { PRICE_CHANGED_MESSAGE } from 'components/StripeContainer/PaymentForm/constants';

const PaymentPage = () => {
  const router = useRouter();
  const { boatId } = router.query;
  const [boat, setBoat] = useState(null);
  const [error, setError] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const boatRef = useRef(boat);
  const payingRef = useRef(paying);
  const paidRef = useRef(paid);
  boatRef.current = boat;
  payingRef.current = paying;
  paidRef.current = paid;

  useEffect(() => {
    if (!boatId) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(collection(db, 'boats'), boatId),
      async (givenBoat) => {
        if (payingRef.current || paidRef.current) {
          return;
        }
        const data = { id: givenBoat.id, ...givenBoat.data() };

        if (
          boatRef.current &&
          (data.price.amount !== boatRef.current.price.amount ||
            data.price.currency !== boatRef.current.price.currency)
        ) {
          sweetAlert(
            'Price changed',
            PRICE_CHANGED_MESSAGE(boatRef.current, data),
            'warning'
          );
        }

        const validation = await validateBoatRental(
          data,
          data.price.amount,
          data.price.currency,
          null,
          null,
          false
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
      <StripeContainer
        boat={boat}
        onPaymentStart={() => setPaying(true)}
        onPaymentEnd={() => setPaying(false)}
        onPaymentCompleted={() => setPaid(true)}
      />
    </IfLoggedIn>
  );
};

export default PaymentPage;
