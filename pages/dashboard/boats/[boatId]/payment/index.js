import StripeContainer from 'components/StripeContainer';
import { useRouter } from 'next/router';
import style from './style.module.css';

const PaymentPage = () => {
  const router = useRouter();
  const { boatId } = router.query;

  return (
    <>
      <h1 className={style.title}>Rent this boat</h1>
      <StripeContainer boatId={boatId} />
    </>
  );
};

export default PaymentPage;
